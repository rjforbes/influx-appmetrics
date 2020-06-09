const appmetrics = require('appmetrics');
const Influx = require('influx');

export const name = 'monitor';
export function startMonitoring(config){

    console.log('Connecting to InfluxDB.');
  
    infclient = new Influx.InfluxDB({
  
      host: config.influx.host ,
      port: config.influx.port,
      username: config.influx.username,
      password: config.influx.password,
      database: config.influx.db,
      schema: [
        {
          measurement: 'cpu',
          fields: {
            cpu_process_usage: Influx.FieldType.FLOAT,
            cpu_system_usage: Influx.FieldType.FLOAT,
          },
          tags: [
            'host','service'
          ]
        },
        {
          measurement: 'memory',
          fields: {
            physical: Influx.FieldType.INTEGER
          },
          tags: [
            'host','service'
          ]
        }
      ]
    });
  
    console.log('Appmetrics monitoring starting.');
    var monitoring = appmetrics.monitor();
    
    monitoring.on('cpu', (cpu) => {
  
      var cpu_process_usage = cpu.process;
      var cpu_system_usage = cpu.system;
  
      infclient.writePoints([
        {
          measurement: 'cpu',
          tags: { host: os.hostname() , service: config.service},
          fields: { cpu_process_usage, cpu_system_usage },
        }
      ]).catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      })
    });
  
    monitoring.on('memory', (memory) => { 
      var physical = memory.physical;
      infclient.writePoints([
        {
          measurement: 'memory',
          tags: { host: os.hostname() , service: config.service},
          fields: { physical }
        }
      ]).catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      })
    });
  
    console.log('Monitoring initialized.');
}

