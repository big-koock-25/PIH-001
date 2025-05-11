const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');
const axios = require('axios');
const net = require('net');
const folder = path.join(__dirname, 'MyFiles');
const urls = [
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/test.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/youtube.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/0Zinc/easylist.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/adaway/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/blocklistproject/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/blocklistproject/youtube.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/craiu/mobiletrackers.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/crazy-max/spy.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/DandelionSprout.GameConsoleAdblockList.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/disconnectme/simple-ad.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/FadeMind/UncheckyAds.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/firebog/AdguardDNS.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/firebog/Admiral.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/firebog/Easylist.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/firebog/Prigent-Ads.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/MajkiIT/SmartTV-ads.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/r-a-y/AdguardMobileAds.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/ShadowWhisperer/Ads.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ads/yoyo/ads-trackers-etc.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/0Zinc/easyprivacy.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/frogeye/firstparty-trackers-hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/MajkiIT/adguard-mobile-host.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/neodevpro/host.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/quidsup/trackers-hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/tracking-and-telemetry/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/amp/developerdan/amp-hosts-extended.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/AssoEchap/stalkerware-indicators.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/bigdargon/hostsVN.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/blocklistproject/malware.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/DandelionSprout-AntiMalwareHosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/digitalside/latestdomains.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/disconnectme/simple-malvertising.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/malware-filter/urlhaus-filter-hosts-online.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/quidsup/notrack-malware.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/reported-by-norton.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/RPiList/Malware.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/sefinek.hosts1.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/sefinek.hosts2.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/Spam404/main-blacklist.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/suspicious.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/web-attacks.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/ransomware/blocklistproject/ransomware.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/malicious/phishing.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/phishing/blocklistproject/phishing.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/phishing/Dogino/Discord-Phishing-URLs-phishing.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/phishing/phishing.army/blocklist-extended.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/phishing/RPiList/Phishing-Angriffe.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/crypto/cryptojacking/firebog/Prigent/Crypto.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/crypto/cryptojacking/hoshsadiq/adblock-nocoin-list.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/crypto/cryptojacking/Snota418/Crypto-streams.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/abuse/blocklistproject/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/abuse/urlhaus.abuse.ch/hostfile.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/fraud/blocklistproject/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/spam/RPiList/spam-mails.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/spam/stopforumspam/toxic-domains-whole.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/spam/FadeMind/add-Spam.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/piracy/blocklistproject/piracy.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/piracy/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/redirect/blocklistproject/redirect.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/scam/blocklistproject/scam.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/scam/Dogino/Discord-Phishing-URLs-scam.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/scam/durablenapkin/scamblocklist.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/scam/jarelllama/scam.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/scam/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/suspicious/FadeMind/add-Risk.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/suspicious/firebog/w3kbl.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/suspicious/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/useless-websites/jarelllama/parked-domains.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/useless-websites/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/dead-domains/jarelllama/dead-domains.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/dating-services/developerdan/extended.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/dating-services/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/fakenews/StevenBlack/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/fakenews/marktron/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/drugs/blocklistproject/drugs.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/hate-and-junk/developerdan/extended.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/hate-and-junk/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/StevenBlack/porn.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/blocklistproject/porn.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/chadmayfield/pi-blocklist-porn-all.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/oisd/nsfw.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/sefinek.hosts2.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/Sinfonietta/pornography-hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/porn/4skinSkywalker/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/lgbtqplus.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/lgbtqplus2.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/deathbybandaid/CountryCodesLists-France.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/deathbybandaid/ParsedBlacklists-EasyList-Liste-FR.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/deathbybandaid/ParsedBlacklists-EasyList.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/FadeMind/add-2o7Net.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/hagezi/pro.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/MajkiIT/adguard-host.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/MajkiIT/easy-privacy-host.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/oisd/big.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/r-a-y/AdguardApps.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/extensions/r-a-y/AdguardMobileSpyware.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/other/StevenBlack/fakenews-gambling-porn.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/StevenBlack/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/blocklistproject/hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/MajkiIT/gambling-hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/TrustPositif/gambling-indonesia.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/gambling/sefinek.hosts2.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/pinterest.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/ometv.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/gamebanana.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/pixiv.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/anime/main.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/booth.pm.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/patreon.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/crypto/sites/sefinek.hosts.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/esport.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/twitter.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/snapchat.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/instagram.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/facebook.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/social/tiktok.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/apps/discord.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/apps/skype.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/apps/whatsapp.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/apps/spotify.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/games/valorant.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/games/league-of-legends.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/sites/riotgames.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/other/polish-blocklists/cert.pl/domains-hosts.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/other/polish-blocklists/MajkiIT/hostfile.fork.txt',
    'https://blocklist.sefinek.net/generated/v1/0.0.0.0/other/polish-blocklists/PolishFiltersTeam/KADhosts.fork.txt',
    'https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt',
    'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts',
    'https://v.firebog.net/hosts/static/w3kbl.txt',
    'https://adaway.org/hosts.txt',
    'https://v.firebog.net/hosts/AdguardDNS.txt',
    'https://v.firebog.net/hosts/Admiral.txt',
    'https://v.firebog.net/hosts/Easylist.txt',
    'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext',
    'https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt',
    'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts',
    'https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts',
    'https://v.firebog.net/hosts/Prigent-Ads.txt',
    'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts',
    'https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt',
    'https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt',
    'https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt',
    'https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts',
    'https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt',
    'https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts',
    'https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt',
    'https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt',
    'https://phishing.army/download/phishing_army_blocklist_extended.txt',
    'https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt',
    'https://v.firebog.net/hosts/Prigent-Crypto.txt',
    'https://v.firebog.net/hosts/RPiList-Malware.txt',
    'https://v.firebog.net/hosts/RPiList-Phishing.txt',
    'https://urlhaus.abuse.ch/downloads/hostfile',
    'https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/youtubelist.txt',
    'https://raw.githubusercontent.com/kboghdady/youTube_ads_4_pi-hole/master/crowed_list.txt',
    'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts',
    'https://raw.githubusercontent.com/r0xd4n3t/pihole-adblock-lists/main/pihole_adlists.txt',
    'https://v.firebog.net/hosts/Easyprivacy.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.amazon.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.apple.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.huawei.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.winoffice.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.tiktok.extended.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.lgwebos.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.vivo.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.oppo-realme.txt',
    'https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/native.xiaomi.txt',
    'https://raw.githubusercontent.com/lassekongo83/Frellwits-filter-lists/master/Frellwits-Swedish-Hosts-File.txt',
    'https://v.firebog.net/hosts/AdguardDNS.txt',
    'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/wildcard/gambling-onlydomains.txt'
];
const systemHostnames = new Set([
    'localhost',
    'local',
    'ip6-allhosts',
    'broadcasthost',
    'ip6-localhost',
    'ip6-loopback',
    'localhost.localdomain',
    'localdomain',
    'ip6-allnodes',
    'ip6-allrouters',
    'ip6-mcastprefix',
    'ip6-localnet',
    '0.0.0.0'
]);

if (!fs.existsSync(folder)) fs.mkdirSync(folder);

const domainMap = new Map();
const lineStats = {};
let totalLines = 0;
const formatFile = i => `Blacklist${String(i + 1).padStart(3, '0')}.txt`;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB each file

async function downloadFiles() {
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const fileName = formatFile(i);
        const filePath = path.join(folder, fileName);
        const res = await axios.get(url, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            res.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        console.log(`Original adlist downloaded and renamed - ${fileName}`);
    }
}

async function processFiles() {
    const files = fs.readdirSync(folder).filter(f => /^Blacklist\d+\.txt$/.test(f)).sort();
    for (const file of files) {
        const filePath = path.join(folder, file);
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        let count = 0;
        for await (const raw of rl) {
            let line = raw.trim();
            if (!line || line.startsWith('#') || line.startsWith('//') || line.startsWith(';') || line.startsWith('::')) continue;

            line = line.split('#')[0].split(';')[0].split('//')[0].trim();

            if (line.startsWith('||')) line = line.slice(2);
            if (line.endsWith('^')) line = line.slice(0, -1);

            const parts = line.split(/\s+/);
            let domain = null;

            if (parts.length === 2) {
                const [, maybeDomain] = parts;
                if (net.isIP(maybeDomain) || systemHostnames.has(maybeDomain.toLowerCase())) continue;
                domain = maybeDomain;
            } else if (parts.length === 1) {
                if (net.isIP(parts[0]) || systemHostnames.has(parts[0].toLowerCase())) continue;
                domain = parts[0];
            } else {
                continue;
            }

            const finalLine = `0.0.0.0 ${domain}`;
            domainMap.set(finalLine, (domainMap.get(finalLine) || 0) + 1);
            count++;
            totalLines++;
        }
        lineStats[file] = count;
    }
}

function writeDuplicates() {
    const duplicates = [...domainMap.entries()]
        .filter(([_, count]) => count > 1)
        .map(([domain]) => domain);
    fs.writeFileSync(path.join(folder, 'Duplicates.txt'), duplicates.join(os.EOL), 'utf-8');
}

function writeUniquesInChunks() {
    const uniques = [...domainMap.keys()];
    let part = 1;
    let buffer = [];
    let bufferSize = 0;

    for (const line of uniques) {
        const lineSize = Buffer.byteLength(line + os.EOL, 'utf-8');
        if (bufferSize + lineSize > MAX_FILE_SIZE) {
            const name = `MyUniqueFile${String(part).padStart(2, '0')}.txt`;
            fs.writeFileSync(path.join(folder, name), buffer.join(os.EOL), 'utf-8');
            buffer = [];
            bufferSize = 0;
            part++;
        }
        buffer.push(line);
        bufferSize += lineSize;
    }

    if (buffer.length) {
        const name = `MyUniqueFile${String(part).padStart(2, '0')}.txt`;
        fs.writeFileSync(path.join(folder, name), buffer.join(os.EOL), 'utf-8');
    }
}

function writeStats() {
    const duplicatesCount = [...domainMap.values()].filter(c => c > 1).length;
    const uniqueCount = domainMap.size;
    const lines = Object.entries(lineStats)
        .map(([file, count]) => `${file} - ${count}`)
        .concat([
            `Total - ${totalLines}`,
            `Duplicates - ${duplicatesCount}`,
            `Uniques - ${uniqueCount}`
        ]);
    fs.writeFileSync(path.join(folder, 'Stat.txt'), lines.join(os.EOL), 'utf-8');
}

(async function main() {
    console.log('Loading files...');
    await downloadFiles();

    console.log('Processing files...');
    await processFiles();

    console.log('Saving duplicates...');
    writeDuplicates();

    console.log('Saving unique domains...');
    writeUniquesInChunks();

    console.log('Saving statistics...');
    writeStats();

    console.log('Done! All files are in - "MyFiles" folder');
})();
