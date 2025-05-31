console.log('hello')

// MARK:Gameクラス
class Game {

    #FIELD_SIZE = 4;

    #field;

    #fieldDOM = document.querySelector('.grid_container');

    // MARK:コンストラクタ
    constructor() {

        // this.#generateFieldDOM();

        this.#initField();

        this.#setField();

        // this.#fieldDOM.computedStyleMap.gridTemplateRows = `repeat(${
        //     this.#FIELD_SIZE
        // }, 70px)`
                
        // this.#fieldDOM.computedStyleMap.gridTemplateColumns = `repeat(${
        //     this.#FIELD_SIZE
        // }, 70px)`
    }

    #initField() {
        this.#field = new Array(this.#FIELD_SIZE)
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            this.#field[i] = new Array(this.#FIELD_SIZE);
        }
        console.log(this.#field);
    }

    #setField() {
        
        // 0の4 * 4配列生成
        for(let i = 0; i < this.#FIELD_SIZE; i++) {

            console.log(i)
            for(let j = 0; j < this.#FIELD_SIZE; j++) {
                this.#field[i][j] = 0;
            
            }
        }

        // 2にしたいマスの乱数生成
        let random_x1 = Math.floor(Math.random() * 4);
        let random_y1 = Math.floor(Math.random() * 4);

        let random_x2 = Math.floor(Math.random() * 4);
        let random_y2 = Math.floor(Math.random() * 4);

        while(random_x1 == random_x2 && random_y1 == random_y2) {
            console.log('かぶった')
            random_x2 = Math.floor(Math.random() * 4);
            random_y2 = Math.floor(Math.random() * 4);
        }

        // 代入
        console.log(random_x1, random_y1 ,random_x2, random_y2)
        this.#field[random_x1][random_y1] = 2;
        this.#field[random_x2][random_y2] = 2;

        // console.log(this.#field);

        this.#print();
        this.#moveRight();

        this.#print();
        // console.log(this.#field);

    }

    #print() {
        // console.log(1, 2, 3, 4);
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            console.log(this.#field[i])
        }
    }

    #moveRight() {
        console.log("右に動いたよ");
        
    }
    
}

const game = new Game();