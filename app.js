var nslookup  = require('nslookup')
  , dns       = ['223.5.5.5', '121.41.89.118'] // China DNS
  , fs        = require('fs')
  , DOMAIN    = process.env.RESOLVE_DOMAIN || 'www.google.com';

// DNS comes from: http://public-dns.info/nameserver/us.html
// JSON comes from: http://public-dns.info/nameserver/us.json
var json = '[{"checked_at":"2016-06-03T21:21:59+02:00","city":"Mountain View","country_id":"US","created_at":"2009-12-04T11:01:47+01:00","dnssec":true,"error":null,"ip":"8.8.8.8","name":"google-public-dns-a.google.com.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:00+02:00","city":"Redwood City","country_id":"US","created_at":"2009-05-13T03:05:06+02:00","dnssec":true,"error":null,"ip":"204.152.184.76","name":"or.isc.org.","reliability":0.85,"version":"9.10.4-P1"},{"checked_at":"2016-06-03T21:21:59+02:00","city":"","country_id":"US","created_at":"2009-05-13T11:28:10+02:00","dnssec":false,"error":null,"ip":"205.171.3.65","name":"resolver1.qwest.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:03+02:00","city":"","country_id":"US","created_at":"2009-05-15T14:49:23+02:00","dnssec":false,"error":null,"ip":"216.106.184.6","name":"ns2.ststelecom.com.","reliability":1.0,"version":"none"},{"checked_at":"2016-06-03T21:22:00+02:00","city":"Smithfield","country_id":"US","created_at":"2009-05-15T14:49:29+02:00","dnssec":false,"error":null,"ip":"72.46.0.2","name":"ns.intap.net.","reliability":0.82,"version":"9.7.3"},{"checked_at":"2016-06-03T21:21:59+02:00","city":"Marlborough","country_id":"US","created_at":"2009-05-15T14:53:05+02:00","dnssec":false,"error":null,"ip":"66.203.66.203","name":"ns.axsne.net.","reliability":0.73,"version":""},{"checked_at":"2016-06-03T21:22:00+02:00","city":"San Francisco","country_id":"US","created_at":"2009-05-15T14:53:05+02:00","dnssec":false,"error":null,"ip":"209.213.223.18","name":"eth0.pal001dn01.yipes.com.","reliability":1.0,"version":"Im using my X-RAY VISION to obtain a rare glimpse of the INNER WORKINGS of this POTATO!!"},{"checked_at":"2016-06-03T21:22:00+02:00","city":"Defiance","country_id":"US","created_at":"2009-05-15T14:53:13+02:00","dnssec":false,"error":null,"ip":"209.143.22.182","name":"bacchus.bright.net.","reliability":1.0,"version":"9.9.6-P1"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Seattle","country_id":"US","created_at":"2009-05-15T14:53:27+02:00","dnssec":false,"error":null,"ip":"216.52.254.1","name":"ns1.lax.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Traverse City","country_id":"US","created_at":"2009-05-15T14:53:29+02:00","dnssec":true,"error":null,"ip":"69.54.70.15","name":"slimer.isphone.net.","reliability":0.98,"version":"9.8.2rc1-RedHat-9.8.2-0.37.rc1.el6_7.7"},{"checked_at":"2016-06-03T21:22:00+02:00","city":"Seattle","country_id":"US","created_at":"2009-05-15T14:53:32+02:00","dnssec":false,"error":null,"ip":"64.94.1.1","name":"ns1.acs.pnap.net.","reliability":0.98,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Seattle","country_id":"US","created_at":"2009-05-15T14:53:33+02:00","dnssec":false,"error":null,"ip":"63.251.161.1","name":"ns1.sef.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Columbia","country_id":"US","created_at":"2009-05-15T14:53:41+02:00","dnssec":true,"error":null,"ip":"165.166.142.42","name":"ns1.spirittelecom.com.","reliability":1.0,"version":"9.8.2rc1-RedHat-9.8.2-0.37.rc1.el6_7.7"},{"checked_at":"2016-06-03T21:22:02+02:00","city":"Alpharetta","country_id":"US","created_at":"2009-05-15T14:53:43+02:00","dnssec":false,"error":null,"ip":"69.60.160.203","name":"edelta2.DADNS.america.net.","reliability":1.0,"version":"9.10.2-P3"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"El Segundo","country_id":"US","created_at":"2009-05-15T14:53:56+02:00","dnssec":false,"error":null,"ip":"192.237.125.2","name":"dns1.info.net.","reliability":0.3,"version":"Nice try, now go away !!!"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Fargo","country_id":"US","created_at":"2009-05-15T14:54:06+02:00","dnssec":false,"error":null,"ip":"65.163.107.11","name":"ns1.ctusa.net.","reliability":1.0,"version":"9.5.0-P2"},{"checked_at":"2016-06-03T21:22:02+02:00","city":"","country_id":"US","created_at":"2009-05-15T14:54:08+02:00","dnssec":false,"error":null,"ip":"208.78.24.238","name":"dns1.nyc.dns-roots.net.","reliability":1.0,"version":"DNSROOTS"},{"checked_at":"2016-06-03T21:22:02+02:00","city":"San Francisco","country_id":"US","created_at":"2009-05-15T14:54:11+02:00","dnssec":false,"error":null,"ip":"216.93.191.228","name":"cache01.ns.witopia.net.","reliability":1.0,"version":"9.10.2-P3"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"","country_id":"US","created_at":"2009-05-15T14:54:12+02:00","dnssec":false,"error":null,"ip":"8.5.244.5","name":"dns01.sjc01.acndigital.net.","reliability":1.0,"version":"9.8.2rc1-RedHat-9.8.2-0.10.rc1.el6"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Seattle","country_id":"US","created_at":"2009-05-15T14:54:22+02:00","dnssec":false,"error":null,"ip":"216.52.254.33","name":"ns2.lax.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"New York","country_id":"US","created_at":"2009-05-15T14:54:29+02:00","dnssec":false,"error":null,"ip":"206.253.194.97","name":"ns2.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:02+02:00","city":"Houston","country_id":"US","created_at":"2009-05-15T14:54:34+02:00","dnssec":false,"error":null,"ip":"129.7.1.1","name":"ns1.uh.edu.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"Chicago","country_id":"US","created_at":"2009-05-15T14:54:53+02:00","dnssec":false,"error":null,"ip":"64.94.33.33","name":"ns2.chg.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:02+02:00","city":"Bridgeport","country_id":"US","created_at":"2009-05-15T14:55:28+02:00","dnssec":false,"error":null,"ip":"66.118.80.4","name":"ns1.wvinternetservices.com.","reliability":1.0,"version":"hi2u"},{"checked_at":"2016-06-03T21:22:02+02:00","city":"Chicago","country_id":"US","created_at":"2009-05-15T14:55:44+02:00","dnssec":false,"error":null,"ip":"64.94.33.1","name":"ns1.chg.pnap.net.","reliability":0.98,"version":""},{"checked_at":"2016-06-03T21:22:01+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:01+02:00","dnssec":false,"error":null,"ip":"4.2.2.1","name":"a.resolvers.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:01+02:00","dnssec":false,"error":null,"ip":"4.2.2.2","name":"b.resolvers.Level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:01+02:00","dnssec":false,"error":null,"ip":"4.2.2.3","name":"c.resolvers.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:01+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:01+02:00","dnssec":false,"error":null,"ip":"4.2.2.4","name":"d.resolvers.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:04+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:02+02:00","dnssec":false,"error":null,"ip":"4.2.2.5","name":"e.resolvers.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:04+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:02+02:00","dnssec":false,"error":null,"ip":"4.2.2.6","name":"f.resolvers.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:02+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:05+02:00","dnssec":true,"error":null,"ip":"199.2.252.10","name":"ns2.sprintlink.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:02+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:05+02:00","dnssec":true,"error":null,"ip":"204.97.212.10","name":"ns3.sprintlink.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:02+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:33:05+02:00","dnssec":true,"error":null,"ip":"204.117.214.10","name":"ns1.sprintlink.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:02+02:00","city":"","country_id":"US","created_at":"2009-05-18T01:59:06+02:00","dnssec":false,"error":null,"ip":"206.124.64.1","name":"bigguy.gte.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:04+02:00","city":"High Point","country_id":"US","created_at":"2009-08-07T23:17:34+02:00","dnssec":false,"error":null,"ip":"216.237.221.42","name":"dns3.nstel.com.","reliability":1.0,"version":"TGIF"},{"checked_at":"2016-06-03T21:22:03+02:00","city":"Seattle","country_id":"US","created_at":"2009-08-07T23:17:40+02:00","dnssec":false,"error":null,"ip":"209.191.129.1","name":"ns1.nyc.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:04+02:00","city":"Eden Prairie","country_id":"US","created_at":"2009-08-07T23:17:44+02:00","dnssec":false,"error":null,"ip":"216.185.192.1","name":"ns1.bhi.com.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:04+02:00","city":"Columbia","country_id":"US","created_at":"2009-08-07T23:17:53+02:00","dnssec":true,"error":null,"ip":"165.166.8.54","name":"ns0.spirittelecom.com.","reliability":0.98,"version":"9.8.2rc1-RedHat-9.8.2-0.37.rc1.el6_7.2"},{"checked_at":"2016-06-03T21:22:08+02:00","city":"New York","country_id":"US","created_at":"2009-08-07T23:18:14+02:00","dnssec":false,"error":null,"ip":"64.212.106.84","name":"dns1.jfk.gblx.net.","reliability":0.98,"version":""},{"checked_at":"2016-06-03T21:22:05+02:00","city":"Philadelphia","country_id":"US","created_at":"2009-08-07T23:18:15+02:00","dnssec":false,"error":null,"ip":"216.52.65.33","name":"ns2.phi.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:05+02:00","city":"San Francisco","country_id":"US","created_at":"2009-08-07T23:18:38+02:00","dnssec":false,"error":null,"ip":"63.251.62.1","name":"ns1.sfo.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:04+02:00","city":"Des Moines","country_id":"US","created_at":"2009-08-07T23:18:54+02:00","dnssec":false,"error":null,"ip":"216.81.128.132","name":"nscache3-mngt.dsm.lightedge.com.","reliability":0.98,"version":"PowerDNS Recursor 3.2 $Id: pdns_recursor.cc 1538 2010-03-06 11:39:03Z ahu $"},{"checked_at":"2016-06-03T21:22:05+02:00","city":"","country_id":"US","created_at":"2009-08-08T00:49:14+02:00","dnssec":false,"error":null,"ip":"63.251.129.1","name":"ns1.bsn.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:05+02:00","city":"Chicago","country_id":"US","created_at":"2009-08-08T00:49:28+02:00","dnssec":false,"error":null,"ip":"216.52.129.1","name":"ns1.chi.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:05+02:00","city":"Seattle","country_id":"US","created_at":"2009-08-08T00:49:34+02:00","dnssec":false,"error":null,"ip":"63.251.161.33","name":"ns2.sef.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:17+02:00","city":"Laurel","country_id":"US","created_at":"2009-08-08T00:50:36+02:00","dnssec":false,"error":null,"ip":"216.147.131.33","name":"ns1.globalsat.net.","reliability":0.97,"version":"9.3.6-P1-RedHat-9.3.6-25.P1.el5_11.2"},{"checked_at":"2016-06-03T21:22:06+02:00","city":"Boca Raton","country_id":"US","created_at":"2009-08-08T00:50:44+02:00","dnssec":true,"error":null,"ip":"66.216.18.222","name":"","reliability":1.0,"version":"9.10.3-P3-RedHat-9.10.3-10.P3.fc23"},{"checked_at":"2016-06-03T21:22:06+02:00","city":"","country_id":"US","created_at":"2009-08-08T23:47:18+02:00","dnssec":false,"error":null,"ip":"63.251.129.33","name":"ns2.bsn.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:06+02:00","city":"New York","country_id":"US","created_at":"2009-08-08T23:48:27+02:00","dnssec":false,"error":null,"ip":"216.52.94.1","name":"ns1.nym.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:07+02:00","city":"Boca Raton","country_id":"US","created_at":"2009-08-08T23:48:37+02:00","dnssec":true,"error":null,"ip":"64.135.1.20","name":"dns1.host.net.","reliability":1.0,"version":"9.9.4-P2-RedHat-9.9.4-17.P2.fc20"},{"checked_at":"2016-06-03T21:22:06+02:00","city":"Englewood","country_id":"US","created_at":"2009-08-08T23:49:16+02:00","dnssec":false,"error":null,"ip":"129.250.35.251","name":"y.ns.gin.ntt.net.","reliability":1.0,"version":"9.8.2rc1-RedHat-9.8.2-0.47.rc1.el6"},{"checked_at":"2016-06-03T21:22:06+02:00","city":"","country_id":"US","created_at":"2009-08-08T23:49:18+02:00","dnssec":false,"error":null,"ip":"209.244.0.4","name":"resolver2.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:11+02:00","city":"New York","country_id":"US","created_at":"2009-08-08T23:49:19+02:00","dnssec":false,"error":null,"ip":"209.130.139.2","name":"dns2.roc.gblx.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:07+02:00","city":"New York","country_id":"US","created_at":"2009-08-08T23:49:51+02:00","dnssec":false,"error":null,"ip":"216.194.28.33","name":"ns1.metconnect.net.","reliability":0.95,"version":"9.5.1-P3"},{"checked_at":"2016-06-03T21:22:06+02:00","city":"","country_id":"US","created_at":"2009-08-08T23:49:52+02:00","dnssec":false,"error":null,"ip":"209.244.0.3","name":"resolver1.level3.net.","reliability":1.0,"version":"Version: main/17936"},{"checked_at":"2016-06-03T21:22:07+02:00","city":"","country_id":"US","created_at":"2009-08-08T23:49:52+02:00","dnssec":false,"error":null,"ip":"208.59.89.20","name":"groo.dns.rcn.net.","reliability":1.0,"version":"RCNg"},{"checked_at":"2016-06-03T21:22:07+02:00","city":"Seattle","country_id":"US","created_at":"2009-08-08T23:49:56+02:00","dnssec":false,"error":null,"ip":"209.191.129.65","name":"ns2.nyc.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"","country_id":"US","created_at":"2009-08-08T23:49:56+02:00","dnssec":false,"error":null,"ip":"207.69.188.189","name":"rns2.mcihispeed.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"","country_id":"US","created_at":"2009-08-09T02:06:29+02:00","dnssec":false,"error":null,"ip":"207.69.188.184","name":"rns0.earthlink.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:08+02:00","city":"","country_id":"US","created_at":"2009-08-09T02:07:24+02:00","dnssec":false,"error":null,"ip":"8.15.12.5","name":"dns01.iad01.acndigital.net.","reliability":1.0,"version":"9.8.2rc1-RedHat-9.8.2-0.10.rc1.el6"},{"checked_at":"2016-06-03T21:22:08+02:00","city":"Chicago","country_id":"US","created_at":"2009-08-09T02:07:36+02:00","dnssec":false,"error":null,"ip":"216.52.129.33","name":"ns2.chi.pnap.net.","reliability":0.98,"version":""},{"checked_at":"2016-06-03T21:22:11+02:00","city":"","country_id":"US","created_at":"2009-08-09T02:07:39+02:00","dnssec":false,"error":null,"ip":"207.69.188.188","name":"rns1.mcihispeed.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:08+02:00","city":"New York","country_id":"US","created_at":"2009-08-09T02:08:42+02:00","dnssec":false,"error":null,"ip":"206.253.194.65","name":"ns1.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:08+02:00","city":"Austin","country_id":"US","created_at":"2009-08-09T02:08:44+02:00","dnssec":false,"error":null,"ip":"66.112.235.200","name":"ns4.apogeenet.net.","reliability":0.98,"version":""},{"checked_at":"2016-06-03T21:22:08+02:00","city":"Englewood","country_id":"US","created_at":"2009-08-09T02:09:53+02:00","dnssec":false,"error":null,"ip":"129.250.35.250","name":"x.ns.gin.ntt.net.","reliability":1.0,"version":"9.8.2rc1-RedHat-9.8.2-0.47.rc1.el6"},{"checked_at":"2016-06-03T21:22:09+02:00","city":"New York","country_id":"US","created_at":"2009-08-09T02:10:02+02:00","dnssec":false,"error":null,"ip":"64.212.106.85","name":"dns2.jfk.gblx.net.","reliability":1.0,"version":"9.6.1-P1"},{"checked_at":"2016-06-03T21:22:09+02:00","city":"Philadelphia","country_id":"US","created_at":"2009-08-09T02:11:18+02:00","dnssec":false,"error":null,"ip":"216.52.65.1","name":"ns1.phi.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"San Francisco","country_id":"US","created_at":"2009-08-09T23:00:41+02:00","dnssec":false,"error":null,"ip":"63.251.62.33","name":"ns2.sfo.pnap.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"Eden Prairie","country_id":"US","created_at":"2009-08-09T23:00:43+02:00","dnssec":false,"error":null,"ip":"216.185.192.2","name":"ns2.bhi.com.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"Houston","country_id":"US","created_at":"2009-08-09T23:01:35+02:00","dnssec":false,"error":null,"ip":"129.7.1.6","name":"ns2.uh.edu.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:10+02:00","city":"East Lansing","country_id":"US","created_at":"2009-08-09T23:01:36+02:00","dnssec":false,"error":null,"ip":"35.8.2.45","name":"nmserv1.ats.msu.edu.","reliability":1.0,"version":"9.8.5-P2"},{"checked_at":"2016-06-03T21:22:10+02:00","city":"Dallas","country_id":"US","created_at":"2009-08-09T23:01:39+02:00","dnssec":false,"error":null,"ip":"66.207.160.111","name":"111.160.207.66.in-addr.arpa.","reliability":1.0,"version":"9.6.-ESV-R3"},{"checked_at":"2016-06-03T21:22:10+02:00","city":"Wapakoneta","country_id":"US","created_at":"2009-08-09T23:02:54+02:00","dnssec":false,"error":null,"ip":"209.143.0.10","name":"primary.dns.bright.net.","reliability":1.0,"version":"9.9.8-P3"},{"checked_at":"2016-06-03T21:22:11+02:00","city":"","country_id":"US","created_at":"2009-12-04T11:01:47+01:00","dnssec":true,"error":null,"ip":"8.8.4.4","name":"google-public-dns-b.google.com.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:12+02:00","city":"","country_id":"US","created_at":"2010-07-31T15:53:26+02:00","dnssec":false,"error":null,"ip":"66.28.0.45","name":"res1.dns.cogentco.com.","reliability":1.0,"version":"blue"},{"checked_at":"2016-06-03T21:22:12+02:00","city":"","country_id":"US","created_at":"2010-07-31T15:53:31+02:00","dnssec":false,"error":null,"ip":"66.28.0.61","name":"res2.dns.cogentco.com.","reliability":1.0,"version":"blue"},{"checked_at":"2016-06-03T21:22:13+02:00","city":"Denver","country_id":"US","created_at":"2010-07-31T21:24:06+02:00","dnssec":false,"error":null,"ip":"76.73.18.50","name":"","reliability":1.0,"version":"9.7.3"},{"checked_at":"2016-06-03T21:22:13+02:00","city":"Fremont","country_id":"US","created_at":"2010-08-05T05:13:35+02:00","dnssec":false,"error":null,"ip":"74.82.42.42","name":"ordns.he.net.","reliability":1.0,"version":"PowerDNS Recursor 4.0.0-alpha2"},{"checked_at":"2016-06-03T21:22:13+02:00","city":"Fremont","country_id":"US","created_at":"2010-09-04T00:12:02+02:00","dnssec":false,"error":null,"ip":"216.66.80.30","name":"tserv1.fra1.he.net.","reliability":1.0,"version":"PowerDNS Recursor 4.0.0-alpha2"},{"checked_at":"2016-06-03T21:22:14+02:00","city":"Phoenix","country_id":"US","created_at":"2010-12-24T00:45:38+01:00","dnssec":false,"error":null,"ip":"206.165.6.12","name":"dns2.phx.gblx.net.","reliability":0.98,"version":"9.6.1-P1"},{"checked_at":"2016-06-03T21:22:17+02:00","city":"New York","country_id":"US","created_at":"2010-12-24T00:45:44+01:00","dnssec":false,"error":null,"ip":"209.130.136.2","name":"dns1.ROC.gblx.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:19+02:00","city":"Warren","country_id":"US","created_at":"2010-12-24T00:45:54+01:00","dnssec":false,"error":null,"ip":"67.17.215.133","name":"dns2.snv.gblx.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:19+02:00","city":"Warren","country_id":"US","created_at":"2010-12-24T00:46:04+01:00","dnssec":false,"error":null,"ip":"67.17.215.132","name":"dns1.snv.gblx.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:19+02:00","city":"Tempe","country_id":"US","created_at":"2011-01-11T02:54:44+01:00","dnssec":false,"error":null,"ip":"69.28.136.102","name":"cachedns.phx1.llnw.net.","reliability":1.0,"version":"9.9.8-P3"},{"checked_at":"2016-06-03T21:22:18+02:00","city":"Middletown Township","country_id":"US","created_at":"2011-01-19T02:15:20+01:00","dnssec":false,"error":null,"ip":"165.87.201.244","name":"nscache07.us.prserv.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:19+02:00","city":"Irvine","country_id":"US","created_at":"2011-01-19T02:25:17+01:00","dnssec":false,"error":null,"ip":"168.215.210.50","name":"ns1.orng.twtelecom.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:19+02:00","city":"Fort Collins","country_id":"US","created_at":"2011-01-19T02:54:12+01:00","dnssec":false,"error":null,"ip":"216.17.128.1","name":"ns1.frii.com.","reliability":0.97,"version":"undisclosed"},{"checked_at":"2016-06-03T21:22:21+02:00","city":"Oak Harbor","country_id":"US","created_at":"2011-01-19T02:55:27+01:00","dnssec":false,"error":null,"ip":"216.186.27.15","name":"ns1.ohsd.net.","reliability":1.0,"version":"100.100.100"},{"checked_at":"2016-06-03T21:22:20+02:00","city":"Littleton","country_id":"US","created_at":"2011-01-21T02:23:47+01:00","dnssec":false,"error":null,"ip":"204.95.160.2","name":"ns1.tosa.twtelecom.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:22+02:00","city":"","country_id":"US","created_at":"2011-01-21T02:24:19+01:00","dnssec":false,"error":null,"ip":"205.152.6.20","name":"ns.eng.bellsouth.net.","reliability":1.0,"version":"lab"},{"checked_at":"2016-06-03T21:22:21+02:00","city":"Coos Bay","country_id":"US","created_at":"2011-01-23T01:25:14+01:00","dnssec":false,"error":null,"ip":"198.237.209.130","name":"ns.coos.k12.or.us.","reliability":1.0,"version":"9.9.3-rl.156.01-P1-RedHat-9.9.3-3.P1.fc17"},{"checked_at":"2016-06-03T21:22:24+02:00","city":"Boulder","country_id":"US","created_at":"2011-01-23T01:25:47+01:00","dnssec":true,"error":null,"ip":"198.60.22.2","name":"cns1.xmission.com.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:23+02:00","city":"Baton Rouge","country_id":"US","created_at":"2011-01-23T01:28:47+01:00","dnssec":false,"error":null,"ip":"199.80.64.202","name":"ns2.state.lib.la.us.","reliability":1.0,"version":"9.3.6-P1-RedHat-9.3.6-25.P1.el5_11.6"},{"checked_at":"2016-06-03T21:22:21+02:00","city":"New Knoxville","country_id":"US","created_at":"2011-01-23T01:56:08+01:00","dnssec":false,"error":null,"ip":"206.51.143.55","name":"ns2.nktelco.net.","reliability":0.97,"version":"9.3.4-P1.1"},{"checked_at":"2016-06-03T21:22:21+02:00","city":"Englewood","country_id":"US","created_at":"2011-01-23T02:12:44+01:00","dnssec":false,"error":null,"ip":"207.179.3.25","name":"ns1.virtela.net.","reliability":0.98,"version":"Not That One."},{"checked_at":"2016-06-03T21:22:37+02:00","city":"Hauppauge","country_id":"US","created_at":"2011-01-23T02:15:16+01:00","dnssec":false,"error":null,"ip":"207.241.160.3","name":"ns1.netsatx.net.","reliability":0.93,"version":"9.3.6-P1-RedHat-9.3.6-20.P1.el5_8.6"},{"checked_at":"2016-06-03T21:22:32+02:00","city":"Hauppauge","country_id":"US","created_at":"2011-01-23T02:15:21+01:00","dnssec":false,"error":null,"ip":"207.241.160.34","name":"ns2.netsatx.net.","reliability":0.97,"version":"9.3.6-P1-RedHat-9.3.6-20.P1.el5_8.6"},{"checked_at":"2016-06-03T21:22:22+02:00","city":"Houston","country_id":"US","created_at":"2011-01-24T02:48:22+01:00","dnssec":false,"error":null,"ip":"209.0.205.11","name":"ns1.bigcity.net.","reliability":1.0,"version":""},{"checked_at":"2016-06-03T21:22:23+02:00","city":"Longmont","country_id":"US","created_at":"2011-01-24T03:12:22+01:00","dnssec":false,"error":null,"ip":"209.97.224.3","name":"ns2.revealsystems.net.","reliability":1.0,"version":"9.3.6-P1-RedHat-9.3.6-20.P1.el5_8.6"}]';
json = JSON.parse(json);
json.forEach(function(item) {
  dns.push(item.ip)
})

console.log('DNS IPs:' + dns.length)


// Slow mode
var resolveDomain = function(domain) {
  
  var aDNS = []; // Avaliable DNSs.

  var resolve = function(index) {

    if (index >= dns.length) {
      console.log('Finished');
      console.log(JSON.stringify(aDNS))
      fs.writeFile(DOMAIN + '.txt', JSON.stringify(aDNS), function(err) {
        if (err) throw err;
        console.log('It\'s saved to ' + DOMAIN + '.txt!');
      });
      return;
    }

    nslookup(domain)
      .server(dns[index])
      .end(function(err, addrs) {

        if (addrs) {
          console.log(dns[index] + ':' + JSON.stringify(addrs))
          pingIPS(addrs, function(aIps){
            
            if (aIps.length > 0) {
              aDNS.push({
                dns: dns[index],
                ips: aIps
              })
            }

            resolve(index + 1);
            console.log('\n');
          })
        } else {
          console.log(dns[index] + ':' + 'No-address-found.')
          resolve(index + 1);
          console.log('\n');
        }

      })
  }
  resolve(0);
}

// Fast mode
var fastResolveDomain = function(domain) {
  var aDNS      = []
    , finished  = 0;

  for (var i = 0; i < dns.length; i++) {
    !(function(index){
      nslookup(domain)
        .server(dns[index])
        .end(function(err, addrs) {

          if (addrs) {
            console.log(dns[index] + ':' + JSON.stringify(addrs))
            pingIPS(addrs, function(aIps){
              
              
              if (aIps.length > 0) {
                aDNS.push({
                  dns: dns[index],
                  ips: aIps
                })
              }

              console.log('\n');
              finished++;
              if (finished === dns.length) {
                console.log('Finished');
                console.log(JSON.stringify(aDNS));
                fs.writeFile(DOMAIN + '.txt', JSON.stringify(aDNS), function(err) {
                  if (err) throw err;
                  console.log('It\'s saved to ' + DOMAIN + '.txt!');
                });
              }
            })
          } else {
            console.log(dns[index] + ':' + 'No-address-found.')

            console.log('\n');
            finished++;
            if (finished === dns.length) {
              console.log('Finished');
              console.log(JSON.stringify(aDNS));
              fs.writeFile(DOMAIN + '.txt', JSON.stringify(aDNS), function(err) {
                if (err) throw err;
                console.log('It\'s saved to ' + DOMAIN + '.txt!');
              });
            }
          }
        })
    })(i);
  }  
}

var pingIPS = function(ips, callback) {
  var Ping    = require('ping-lite')
    , length  = ips.length
    , index   = 0
    , aIps    = []; // Avaliable ips.


  for (var i = 0; i < ips.length; i++) {
    !(function(ip){
      
      if (ip === null) {
        index++;
        if (index === length) {
          return callback(aIps);
        }
      }

      var ping = new Ping(ip);
       
      ping.send(function(err, ms) {

        // Push current ip to avaliable ips.
        if (ms) {
          aIps.push({
            ip: ping._host,
            time: ms
          })
          console.log(ping._host + '\t: ' + ms + ' ms.');  
        } else {
          console.log(ping._host + '\t:' + 'Not-Avaliable')
        } 
        
        index++;
        if (index === length) {

          return callback(aIps);
        }
      });

    })(ips[i]);
  }
}


// resolveDomain('www.google.com');
fastResolveDomain(DOMAIN);
// pingIPS('223.5.5.5,8.8.8.8,206.124.64.1,204.117.214.10,223.5.5.5,121.41.89.118,129.7.1.6,209.191.129.1,216.194.28.33,209.244.0.3'.split(','));
