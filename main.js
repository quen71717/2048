console.log('hello')

// MARK:Gameクラス
class Game {

    #FIELD_SIZE = 4;

    // インスタンス変数
    #field; // 2048視覚化した配列
    #fieldState; // どの座標に数字が入っているかを保存する配列

    #fieldDOM = document.querySelector('.grid_container');

    // MARK:コンストラクタ
    constructor() {

        this.#fieldState = [];

        // this.#generateFieldDOM();

        this.#initField();

        this.#setField();

        // this.#fieldDOM.computedStyleMap.gridTemplateRows = `repeat(${
        //     this.#FIELD_SIZE
        // }, 70px)`
                
        // this.#fieldDOM.computedStyleMap.gridTemplateColumns = `repeat(${
        //     this.#FIELD_SIZE
        // }, 70px)`

        // this.#setState(1, 2);
        // this.#setState(2, 2);
    }

    #initField() {
        this.#field = new Array(this.#FIELD_SIZE)
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            this.#field[i] = new Array(this.#FIELD_SIZE);
        }
        // console.log(this.#field);
    }

    #setField() {
        
        // 0の4 * 4配列生成
        for (let i = 0; i < this.#FIELD_SIZE; i++) {

            // console.log(i)
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                this.#field[i][j] = 0;
            
            }
        }

        // 2にしたいマスの乱数生成
        let random_x1 = Math.floor(Math.random() * 4);
        let random_y1 = Math.floor(Math.random() * 4);

        let random_x2 = Math.floor(Math.random() * 4);
        let random_y2 = Math.floor(Math.random() * 4);
        


        while (random_x1 == random_x2 && random_y1 == random_y2) {
            // console.log('かぶった')
            random_x2 = Math.floor(Math.random() * 4);
            random_y2 = Math.floor(Math.random() * 4);
        }

        // 代入
        // console.log(random_x1, random_y1 ,random_x2, random_y2)
        this.#field[random_x1][random_y1] = 2;
        this.#field[random_x2][random_y2] = 2;

        this.#setState(random_x1, random_y1);
        this.#setState(random_x2, random_y2);
        // this.#setState(2, 3);
        // console.log("てきとうにせっと！")
        // console.log(this.#fieldState)
        // this.#deleteState(2, 3);
        // console.log("けした！")
        // console.log(this.#fieldState)

        this.#setNumber();
        // console.log(this.#field);

        this.#print();
        // this.#moveRight();

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
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                if (j != 3) {
                    this.#field[i][j + 1] = this.#field[i][j] + this.#field[i][j + 1]
                    this.#field[i][j] = 0;
                }
                // if (this.#field[i][j] == 2 && j != 3) {
                //     this.#field[i][j + 1] = 2;
                //     this.#field[i][j] = 0;
                // }
            }
        } 

        // for (let i = 3; 0 <= i; i--) {
        //     for (let j = 3; 0 <= j; j--) {
        //         console.log(i)
        //         if ()
        //     }
        // } 

    }

    // 仮で4を入れるメソッド
    #setNumber() {
        let random_x3 = Math.floor(Math.random() * 4);
        let random_y3 = Math.floor(Math.random() * 4);

        let random_x4 = Math.floor(Math.random() * 4);
        let random_y4 = Math.floor(Math.random() * 4);

        while (this.#fieldState.findIndex(data => data[0] == random_x3 && data[1] == random_y3) != -1) {
            console.log("a")
            random_x3 = Math.floor(Math.random() * 4);
            random_y3 = Math.floor(Math.random() * 4);
        }

        this.#setState(random_x3, random_y4);

        while (this.#fieldState.findIndex(data => data[0] == random_x4 && data[1] == random_y4) != -1) {
            console.log("b")
            random_x4 = Math.floor(Math.random() * 4);
            random_y4 = Math.floor(Math.random() * 4);
        }
                   
        
        this.#field[random_x3][random_y3] = 4;
        this.#field[random_x4][random_y4] = 4;
        this.#setState(random_x3, random_y3);
        this.#setState(random_x4, random_y4);
        console.log(this.#field);
        console.log('どこにあるか')
        console.log(this.#fieldState);
    }

    // fieldStateに座標を保存,追加するメソッド
    #setState(x, y) {
        this.#fieldState.push([x, y]);
        console.log(this.#fieldState);
    }

    #deleteState(x, y) {
        let deleteNum = this.#fieldState.findIndex(data => data[0] == x && data[1] == y);
        this.#fieldState.splice(deleteNum, 1)
        // this.#fieldState = stateCopy;
        // console.log("deleteばんごー")
        // console.log(deleteNum);
        // console.log(this.#fieldState);
    }
    
}

const game = new Game();