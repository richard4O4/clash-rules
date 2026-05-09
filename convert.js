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

const MARKER_DOMAIN = '7h1s_rul35et_i5_mad3_by_r1ch4rd404-clash-rules.github.io';

ensureDir('classical');

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`Skipping missing file: ${file}`);
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    const classicalLines = [`DOMAIN,${MARKER_DOMAIN}`];
    const singboxRule = {
        domain: [MARKER_DOMAIN],
        domain_suffix: [MARKER_DOMAIN],
        domain_keyword: [],
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
                classicalLines.push(trimmed);
                singboxRule.domain.push(trimmed.substring(7));
            } else if (trimmed.startsWith('DOMAIN-SUFFIX,')) {
                classicalLines.push(trimmed);
                singboxRule.domain_suffix.push(trimmed.substring(14));
            } else if (trimmed.startsWith('DOMAIN-KEYWORD,')) {
                classicalLines.push(trimmed);
                singboxRule.domain_keyword.push(trimmed.substring(15));
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
    const isIP = file.startsWith('ip/');
    const classicalFileName = isIP ? `ip_${path.basename(file)}` : path.basename(file);
    const classicalFile = path.join('classical', classicalFileName);
    fs.writeFileSync(classicalFile, classicalLines.join('\n') + '\n');


    // Write Sing-box JSON
    const jsonFile = file.replace('.txt', '.json');
    
    // Ensure the rule object has version 2 and a structure matching Sukka's
    const ruleObject = {
        domain: singboxRule.domain,
        domain_suffix: singboxRule.domain_suffix
    };

    if (singboxRule.domain_keyword.length > 0) ruleObject.domain_keyword = singboxRule.domain_keyword;
    if (singboxRule.ip_cidr.length > 0) ruleObject.ip_cidr = singboxRule.ip_cidr;
    if (singboxRule.ip_asn.length > 0) ruleObject.ip_asn = singboxRule.ip_asn;

    const singboxOutput = {
        version: 2,
        rules: [ruleObject]
    };

    fs.writeFileSync(jsonFile, JSON.stringify(singboxOutput, null, 2) + '\n');
    console.log(`Converted ${file} to classical and sing-box formats.`);
});

