# influx-appmetrics
####Send simple monitoring with appmetrics to influxdb.

This monitors CPU and Memory for the node application it is included in and sends the results to influxdb.  Set the config and start monitoring.  The influx database must already be created.

This was created to pull this data into Grafana for monitoring.

```
const monitoring = require('influx-appmetrics');

var config = {};
config.service = "test-service";
config.influx = {};
config.influx.host = 'influxhost';
config.influx.port = 8086;
config.influx.username = 'influxuser';
config.influx.password = 'influxpass';
config.influx.db = 'influxdbname';

monitoring.startMonitoring(config);
```
