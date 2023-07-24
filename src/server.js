import { createServer, Model } from 'miragejs';

export function makeServer( { environment = 'test' } = {}) {
    
    let server = createServer({

        environment,

        models: {
          entities: Model,
        },

        seeds(server) {

          server.create('entity', {
            id:1,
            name: 'Entity1',
            coordinate: { x: -5, y: 10},
            labels: ["labelA", "labelB", "labelE"]
              
          });

          server.create('entity', {
            id:2,
            name: 'Entity2',
            coordinate: { x: 3, y: 6},
            labels: ["labelC", "labelD"]
              
          });

          server.create('entity', {
            id:3,
            name: 'Entity3',
            coordinate: { x: 4, y: -1},
            labels: ["labelA", "labelC"]
              
          });
         
        },
   

    routes() {

        this.namespace = 'api/entities';

        this.get('/', (schema, request) => {
            
          return schema.entities.all();
        });

        this.get('/:id', (schema, request) => {

          let id = request.params.id;

          return schema.entities.find(id);
        });

        this.post('/', (schema, request) => {

          let attrs = JSON.parse(request.requestBody);

          return schema.entities.create(attrs);
        });

        this.put('/:id', (schema, request) => {

          let newAttrs = JSON.parse(request.requestBody);
          let id = request.params.id;
          let entity = schema.entities.find(id);

          return entity.update(newAttrs);
        });

        this.delete('/:id', (schema, request) => {

          let id = request.params.id;
          schema.entities.find(id).destroy()
          return id;
        });

        this.get('/get-id', (schema, request) =>{

          let id = schema.entities.all().length

            return {id: id + 1};
        });
      },

    });

    

  return server;

}