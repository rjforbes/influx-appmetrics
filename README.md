# influx-appmetrics
Modular integration of influxdb to store appmetrics data for monitoring.

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
