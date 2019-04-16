export default class Dao {

    static getTamanhos(){

       return [
            {
                id:1,
                name:"Pequeno",
                quantidade_sabores:1
            },
            {
                id:2,
                name:"Médio",
                quantidade_sabores:2
            },
            {   id:3,
                name:"Grande",
                quantidade_sabores:3
            }
        ];
    }

    static getCidades(){

        return [
            {
                id:1,
                name:"Jaraguá do Sul",
            },
            {
                id:2,
                name:"Corupá",
            },
            {   id:3,
                name:"Guaramirim"
            }
        ];
     }

     static getBairros(id : any){
        if(id == 1){
           return [
                {
                    name:"Centro",
                    value:"1.5"
                },
                {
                    name:"Amizade",
                    value:"2.5"
                },
                {   name:"Santa Luzia",
                    value:"4.0"
                },
                {
                    name:"Rau",
                    value:"1.5"
                }
            ]
        }
        else if(id == 2){
            return [
                {
                    name:"Seminário",
                    value:"5.0"
                },
                {
                    name:"Ano Bom",
                    value:"7.10"
                },
                {   name:"Centro",
                    value:"4.5"
                }
            ]
        }
        else if(id == 3){
            return  [
                {
                    name:"Avai",
                    value:"6.0"
                },
                {
                    name:"Centro",
                    value:"5.0"
                },
                {   name:"Corticeira",
                    value:"8.5"
                }
            ]
        }
        else {
            console.log("Requisição inválida");
            return [];
        }
     }

     static getSabores(id : any){
        if(id == 1){
            return [
                {
                    sabor:"Calabresa",
                    preco:"12"
                },
                {
                    sabor:"Quatro Queijos",
                    preco:"15"
                },
                {   sabor:"Bacon",
                    preco:"13"
                },
                {
                    sabor:"Chocolate",
                    preco:"14"
                },
                {
                    sabor:"Frango",
                    preco:"10"
                }]
        }
        else if (id == 2){
             return [
                {
                    sabor:"Portuguesa",
                    preco:"11"
                },
                {
                    sabor:"Brocólis",
                    preco:"15"
                },
                {   sabor:"Carne",
                    preco:"16"
                },
                {
                    sabor:"Banana Nevada",
                    preco:"14"
                },
                {
                    sabor:"Mexicana",
                    preco:"22"
                }
            ]
        }
        else if (id == 3){
            return [
                {
                    sabor:"Chocolate Branco",
                    preco:"11"
                },
                {
                    sabor:"Kartofel",
                    preco:"15"
                },
                {   sabor:"Strogonoff",
                    preco:"16"
                },
                {
                    sabor:"Peito de Peru",
                    preco:"14"
                },
                {
                    sabor:"Charge",
                    preco:"22"
                }
            ]
        }
        else{
            return [];
        }
    }
}       
