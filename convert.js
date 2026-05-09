const fs = require('fs');
const path = require('path');

const files = [
    'non_ip/my_reject.txt',
    'non_ip/my_proxy.txt',
    'non_ip/my_direct.txt',
    'ip/my_reject.txt',
    'ip/my_direct.txt'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir('classical');

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`Skipping missing file: ${file}`);
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    const classicalLines = [];
    const singboxRule = {
        domain: [],
        domain_suffix: [],
        ip_cidr: [],
        ip_asn: []
    };

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
            classicalLines.push(line);
            return;
        }

        if (file.startsWith('non_ip/')) {
            if (trimmed.startsWith('+.')) {
                const domain = trimmed.substring(2);
                classicalLines.push(`DOMAIN-SUFFIX,${domain}`);
                singboxRule.domain_suffix.push(domain);
            } else if (trimmed.startsWith('DOMAIN,')) {
                // Already has prefix
                classicalLines.push(trimmed);
                singboxRule.domain.push(trimmed.substring(7));
            } else if (trimmed.startsWith('DOMAIN-SUFFIX,')) {
                classicalLines.push(trimmed);
                singboxRule.domain_suffix.push(trimmed.substring(14));
            } else {
                classicalLines.push(`DOMAIN,${trimmed}`);
                singboxRule.domain.push(trimmed);
            }
        } else if (file.startsWith('ip/')) {
            classicalLines.push(trimmed);
            const parts = trimmed.split(',');
            const type = parts[0].toUpperCase();
            const value = parts[1];
            if (type === 'IP-CIDR' || type === 'IP-CIDR6') {
                singboxRule.ip_cidr.push(value);
            } else if (type === 'IP-ASN') {
                const asn = parseInt(value, 10);
                if (!isNaN(asn)) {
                    singboxRule.ip_asn.push(asn);
                }
            }
        }
    });

    // Write Classical
    const classicalFile = path.join('classical', path.basename(file));
    fs.writeFileSync(classicalFile, classicalLines.join('\n') + '\n');

    // Write Sing-box JSON
    const jsonFile = file.replace('.txt', '.json');
    const filteredRule = Object.fromEntries(
        Object.entries(singboxRule).filter(([_, v]) => v.length > 0)
    );

    if (Object.keys(filteredRule).length > 0) {
        const singboxOutput = {
            version: 1,
            rules: [filteredRule]
        };
        fs.writeFileSync(jsonFile, JSON.stringify(singboxOutput, null, 2) + '\n');
    } else {
        // Create empty ruleset if no rules
        const singboxOutput = {
            version: 1,
            rules: []
        };
        fs.writeFileSync(jsonFile, JSON.stringify(singboxOutput, null, 2) + '\n');
    }
    console.log(`Converted ${file} to classical and sing-box formats.`);
});
