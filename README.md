# clash-rules

Only for Clash Premium:

## Sukka Ruleset

```yaml
proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies:
      - ♻️ 自动选择
      - DIRECT
      - Server
      - Server1
  - name: ♻️ 自动选择
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
      - Server
      - Server1

rule-providers:
  reject_non_ip_reject:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/non_ip/reject.txt
    path: ./sukkaw_ruleset/reject_non_ip_reject.txt
  reject_non_ip_my_reject:
    type: http
    behavior: domain
    format: text
    interval: 43200
    url: https://cdn.jsdelivr.net/gh/Richard4O4/clash-rules/non_ip/my_reject.txt
    path: ./sukkaw_ruleset/reject_non_ip_my_reject.txt
  direct_non_ip_lan:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/non_ip/lan.txt
    path: ./sukkaw_ruleset/direct_non_ip_lan.txt
  direct_non_ip_direct:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/non_ip/direct.txt
    path: ./sukkaw_ruleset/direct_non_ip_direct.txt
  direct_non_ip_domestic:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/non_ip/domestic.txt
    path: ./sukkaw_ruleset/direct_non_ip_domestic.txt
  direct_non_ip_neteasemusic:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/non_ip/neteasemusic.txt
    path: ./sukkaw_ruleset/direct_non_ip_neteasemusic.txt
  direct_non_ip_my_direct:
    type: http
    behavior: domain
    format: text
    interval: 43200
    url: https://cdn.jsdelivr.net/gh/Richard4O4/clash-rules/non_ip/my_direct.txt
    path: ./sukkaw_ruleset/direct_non_ip_my_direct.txt
  reject_ip_reject:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/ip/reject.txt
    path: ./sukkaw_ruleset/reject_ip_reject.txt
  reject_ip_my_reject:
    type: http
    behavior: ipcidr
    format: text
    interval: 43200
    url: https://cdn.jsdelivr.net/gh/Richard4O4/clash-rules/ip/my_reject.txt
    path: ./sukkaw_ruleset/reject_ip_my_reject.txt
  direct_ip_china_ip:
    type: http
    behavior: ipcidr
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/ip/china_ip.txt
    path: ./sukkaw_ruleset/direct_ip_china_ip.txt
  direct_ip_domestic:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/ip/domestic.txt
    path: ./sukkaw_ruleset/direct_ip_domestic.txt
  direct_ip_neteasemusic:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/ip/neteasemusic.txt
    path: ./sukkaw_ruleset/direct_ip_neteasemusic.txt
  direct_ip_lan:
    type: http
    behavior: classical
    format: text
    interval: 43200
    url: https://ruleset.skk.moe/Clash/ip/lan.txt
    path: ./sukkaw_ruleset/direct_ip_lan.txt
  direct_ip_my_direct:
    type: http
    behavior: ipcidr
    format: text
    interval: 43200
    url: https://cdn.jsdelivr.net/gh/Richard4O4/clash-rules/ip/my_direct.txt
    path: ./sukkaw_ruleset/direct_ip_my_direct.txt

rules:
  - RULE-SET,reject_non_ip_reject,REJECT
  - RULE-SET,reject_non_ip_my_reject,REJECT
  - RULE-SET,direct_non_ip_lan,DIRECT
  - RULE-SET,direct_non_ip_direct,DIRECT
  - RULE-SET,direct_non_ip_domestic,DIRECT
  - RULE-SET,direct_non_ip_neteasemusic,DIRECT
  - RULE-SET,direct_non_ip_my_direct,DIRECT
  - RULE-SET,reject_ip_reject,REJECT
  - RULE-SET,reject_ip_my_reject,REJECT
  - RULE-SET,direct_ip_china_ip,DIRECT,no-resolve
  - RULE-SET,direct_ip_domestic,DIRECT
  - RULE-SET,direct_ip_neteasemusic,DIRECT
  - RULE-SET,direct_ip_lan,DIRECT,no-resolve
  - RULE-SET,direct_ip_my_direct,DIRECT,no-resolve
  - GEOIP,CN,DIRECT,no-resolve
  - MATCH,🚀 节点选择

```

如果你从 [Sukka](https://skk.moe/) 提供的 Ruleset Server（[`https://ruleset.skk.moe`](https://ruleset.skk.moe/)）获取本项目中的规则组文件，则意味着你已知晓并同意 [隐私政策](https://skk.moe/privacy-policy/) 中的所有条款。如果你不同意，请通过[相应 GitHub 仓库](https://github.com/SukkaW/Surge)获其项目中的源码、自行构建规则组文件。

**请务必按照 `domainset`、`non_ip`、`ip`，和 README 中的顺序 将规则组添加到你的配置文件中，确保所有 `domainset` 或 `non_ip` 规则组 位于所有的 `ip` 规则组之前**。

> Surge 和 Clash 会按照规则在配置中的顺序、从上到下逐一匹配，当且仅当进行 IP 规则的匹配、FINAL、或 direct 策略时，才会进行 DNS 解析。按照一定的顺序添加规则组，可以避免不必要的 DNS 解析。

## Reference

* [SukkaW/Surge](https://github.com/SukkaW/Surge)
