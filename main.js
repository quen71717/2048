console.log('hello')

// MARK:Gameクラス
class Game {

    #FIELD_SIZE = 4;

    static STATE_TITLE = 0;
    static STATE_INGAME = 1;
    static STATE_GAMEOVER = 2
    static STATE_GAMECLEAR = 3;

    // インスタンス変数
    #field; // 2048視覚化した配列
    #fieldState; // どの座標に数字が入っているかを保存する配列

    #gameState = Game.STATE_TITLE;

    #fieldDOM = document.querySelector('.grid_container');
    #messageDOM = document.getElementById('message')

    // MARK:コンストラクタ
    constructor() {

        this.#fieldState = [];

        this.#generateFieldDOM();

        this.#initField();

        this.#setField();

        this.#gameState = Game.STATE_INGAME;

        this.#fieldDOM.computedStyleMap.gridTemplateRows = `repeat(${
            this.#FIELD_SIZE
        }, 70px)`
                
        this.#fieldDOM.computedStyleMap.gridTemplateColumns = `repeat(${
            this.#FIELD_SIZE
        }, 70px)`


        window.addEventListener('keydown', this.#handleKeyClick.bind(this));

        // this.#setState(1, 2);
        // this.#setState(2, 2);
    }

    // MARK:initField
    #initField() {
        this.#field = new Array(this.#FIELD_SIZE)
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            this.#field[i] = new Array(this.#FIELD_SIZE);
        }
        // console.log(this.#field);
    }

    //MARK:setField
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
        // this.#field[random_x1][random_y1] = 2;
        // this.#field[random_x2][random_y2] = 2;

        this.#writeFieldAndState(random_x1, random_y1, 2);
        this.#writeFieldAndState(random_x2, random_y2, 2);
        // this.#setState(2, 3);
        // console.log("てきとうにせっと！")
        // console.log(this.#fieldState)
        // this.#deleteState(2, 3);
        // console.log("けした！")
        // console.log(this.#fieldState)

        // this.#setNumber();
        // console.log(this.#field);
        // this.#writeFieldAndState(0, 1, 2);
        // this.#writeFieldAndState(0, 2, 2);
        // this.#writeFieldAndState(0, 3, 2);
        // this.#writeFieldAndState(0, 0, 2);

        // this.#print();
        // this.#moveRight();

        // this.#print();

        // this.#moveLeft();

        // this.#moveDown();
        // this.#moveUp();
        // this.#print();
        console.log(this.#fieldState);

        this.#render();
        // console.log(this.#field);

    }

    // MARK:generateFieldDOM
    #generateFieldDOM() {
        const gridContainer = document.querySelector('.grid_container');

        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                const gridItem = document.createElement('div');

                gridItem.classList.add('grid_item');
                gridItem.setAttribute('id', `${i}-${j}`);
                gridContainer.appendChild(gridItem);
            }
        }
    }

    // MARK:print
    #print(field) {
        let str = "";
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            // console.log(this.#field[i])
            str += field[i].join(" ")+"\n"
        }
        console.log(str);
    }

    // MARK:moveRight
    #moveRight() {
        console.log("右に動いたよ");
        let cnt = 2;
        for (let i = 3; 0 <= i; i--) {

            for (let j = 3; 0 <= j; j--) {
                cnt = j - 1;
                // console.log(i, j)
                // cntがマス内で寄せたいマスが０か寄せたいマスと比較マスが同じか比較マスが０の時
                while (cnt != -1 && (this.#field[i][j] == 0 || this.#field[i][j] == this.#field[i][cnt] || this.#field[i][cnt] == 0)) {
                    // console.log(cnt)
                    // 比較マスが０じゃなかったら座標削除と保存
                    if (this.#field[i][cnt] != 0) {
                        this.#deleteState(i, cnt);
                        console.log(i, j);
                        this.#setState(i, j);
                    }
                    // 寄せたいますを寄せたいマス＋比較マス
                    this.#field[i][j] = this.#field[i][j] + this.#field[i][cnt];
                    // this.#writeFieldAndState(i, j , this.#field[i][j] + this.#field[i][cnt])
                    // 比較マスを綺麗にする
                    this.#field[i][cnt] = 0;
                    cnt --;
                }
                // if (j != 0 && (this.#field[i][j] == 0 || this.#field[i][j] == this.#field[i][j - 1])) {
                //     this.#field[i][j] = this.#field[i][j] + this.#field[i][j - 1];
                //     this.#field[i][j - 1] = 0;
                // }
            }
        }

        // for (let i = 0; i < this.#FIELD_SIZE; i++) {
        //     for (let j = 0; j < this.#FIELD_SIZE; j++) {
        //         if (j != 3) {
        //             this.#field[i][j + 1] = this.#field[i][j] + this.#field[i][j + 1]
        //             this.#field[i][j] = 0;
        //         }
                // if (this.#field[i][j] == 2 && j != 3) {
                //     this.#field[i][j + 1] = 2;
                //     this.#field[i][j] = 0;
                // }
        //     }
        // } 
        
    }

    // MARK:moveLeft
    #moveLeft() {
        console.log("左に動いたよ");
        let cnt = 1;
        for (let i = 0; i < this.#FIELD_SIZE; i++) {

            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                cnt = j + 1;
                // console.log(i, j, cnt)
                while (cnt != 4 && (this.#field[i][j] == 0 || this.#field[i][j] == this.#field[i][cnt] || this.#field[i][cnt] == 0)) {
                    if (this.#field[i][cnt] != 0) {
                        this.#deleteState(i, cnt);
                        this.#setState(i, j);
                    }
                    this.#field[i][j] = this.#field[i][j] + this.#field[i][cnt];
                    // this.#writeFieldAndState(i, j , this.#field[i][j] + this.#field[i][cnt])
                    this.#field[i][cnt] = 0;
                    cnt ++;
                }
                // if (j != 0 && (this.#field[i][j] == 0 || this.#field[i][j] == this.#field[i][j - 1])) {
                //     this.#field[i][j] = this.#field[i][j] + this.#field[i][j - 1];
                //     this.#field[i][j - 1] = 0;
                // }
            }
        }
    }

    //MARK:moveUp
    #moveUp() {
        console.log("上に動いたよ");
        let cnt = 1;
        for (let i = 0; i < this.#FIELD_SIZE; i++) {

            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                cnt = j + 1;
                // console.log(i, j, cnt)
                while (cnt != 4 && (this.#field[j][i] == 0 || this.#field[j][i] == this.#field[cnt][i] || this.#field[cnt][i] == 0)) {
                    // console.log(cnt)
                    if (this.#field[cnt][i] != 0) {
                        this.#deleteState(cnt, i);
                        this.#setState(j, i);
                    }
                    this.#field[j][i] = this.#field[j][i] + this.#field[cnt][i];
                    // this.#writeFieldAndState(i, j , this.#field[i][j] + this.#field[i][cnt])
                    this.#field[cnt][i] = 0;
                    cnt ++;
                }
                // if (j != 0 && (this.#field[i][j] == 0 || this.#field[i][j] == this.#field[i][j - 1])) {
                //     this.#field[i][j] = this.#field[i][j] + this.#field[i][j - 1];
                //     this.#field[i][j - 1] = 0;
                // }
            }
        }
    }
    //MARK:moveDown
    #moveDown() {
        console.log("下に動いたよ");
        let cnt = 2;
        for (let i = 3; 0 <= i; i--) {

            for (let j = 3; 0 <= j; j--) {
                cnt = j - 1;
                // console.log(i, j, cnt)
                while (cnt != -1 && (this.#field[j][i] == 0 || this.#field[j][i] == this.#field[cnt][i] || this.#field[cnt][i] == 0)) {
                    // console.log(cnt)
                    if (this.#field[cnt][i] != 0) {
                        this.#deleteState(cnt, i);
                        this.#setState(j, i);
                    }
                    this.#field[j][i] = this.#field[j][i] + this.#field[cnt][i];
                    // this.#writeFieldAndState(i, j , this.#field[i][j] + this.#field[i][cnt])
                    this.#field[cnt][i] = 0;
                    cnt --;
                }

            }
        }

    }

    // MARK:copy
    #copy() {
        // let copy = [...this.#field];

                const copy = new Array(this.#FIELD_SIZE)
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            copy[i] = new Array(this.#FIELD_SIZE);
        }

        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++){
                copy[i][j] = this.#field[i][j]
            }
        }
        console.log("COPY")
        this.#print(copy);
        
        return copy;
        
        // this.#confirm(copy);
    }
    
    #confirm(copy) {
        
        console.log("CONFIRM")
        this.#print(copy);
        this.#print(this.#field);
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                if (copy[i][j] != this.#field[i][j]) {
                    return this.#setNumber();
                }
            }
        }

    }

    // MARK:setNumber
    // 仮で4を入れるメソッド
    #setNumber() {

        if (this.#fieldState.length == 16) {
            return;
        }

        // 256からたまに４(90%らしい)
        let random_x3 = Math.floor(Math.random() * 4);
        let random_y3 = Math.floor(Math.random() * 4);

        // let random_x4 = Math.floor(Math.random() * 4);
        // let random_y4 = Math.floor(Math.random() * 4);

        while (this.#fieldState.findIndex(data => data[0] == random_x3 && data[1] == random_y3) != -1) {
            console.log("a")
            random_x3 = Math.floor(Math.random() * 4);
            random_y3 = Math.floor(Math.random() * 4);
        }

        this.#setState(random_x3, random_y3);
        this.#field[random_x3][random_y3] = 2;

        // this.#writeFieldAndState(random_x3, random_y3, 2)


        // while (this.#fieldState.findIndex(data => data[0] == random_x4 && data[1] == random_y4) != -1) {
        //     console.log("b")
        //     random_x4 = Math.floor(Math.random() * 4);
        //     random_y4 = Math.floor(Math.random() * 4);
        // }
                   
        
        // this.#field[random_x4][random_y4] = 2;
        // this.#setState(random_x4, random_y4);

        // this.#writeFieldAndState(random_x4, random_y4, 2);

        // console.log(this.#field);
        console.log('どこにあるか')
        console.log(this.#fieldState);
    }

    // MARK:setState
    // fieldStateに座標を保存,追加するメソッド
    #setState(x, y) {
        let check = this.#fieldState.findIndex(data => data[0] == x && data[1] == y);
        if (check == -1) {
            this.#fieldState.push([x, y]);
            console.log(this.#fieldState);
        }

    }

    // MARK:writeFieldAndState
    #writeFieldAndState(x, y, z) {

        // 可視化Fieldに書く
        this.#field[x][y] = z
        // Stateに座標書く
        this.#fieldState.push([x, y]);
        console.log(this.#fieldState);

    }

    #debugSetState() {
        
    }

    // MARK:deleteState
    #deleteState(x, y) {
        let deleteNum = this.#fieldState.findIndex(data => data[0] == x && data[1] == y);
        this.#fieldState.splice(deleteNum, 1)
        // this.#fieldState = stateCopy;
        // console.log("deleteばんごー")
        // console.log(deleteNum);
        // console.log(this.#fieldState);
    }

    // MARK:render
    #render() {
        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                const cell = this.#fieldDOM.childNodes[i * this.#FIELD_SIZE + j];
                if (this.#field[i][j] != 0) {
                    cell.innerText = this.#field[i][j];
                } else {
                    cell.innerText = "";
                }
                // console.log(cell)
            }
        }
    }

    // MARK:handleKeyClick
    #handleKeyClick(event) {
        if (this.#gameState != Game.STATE_INGAME) return;
        this.#print(this.#field);
        let copy = this.#copy();
        console.log(event.key);
        switch (event.key) {
            case 'ArrowUp':
                case 'w':
                this.#moveUp();
                console.log("MOVED")
                this.#print(copy);
                this.#confirm(copy);
                // this.#setNumber();
                this.#render();
                this.#judgement();
                break;

            case 'ArrowDown':
            case 's':
                this.#moveDown();
                this.#confirm(copy);
                this.#render();
                this.#judgement();
                break;

            case 'ArrowLeft':
            case 'a':
                this.#moveLeft();
                this.#confirm(copy);
                this.#render();
                this.#judgement();
                break;

            case 'ArrowRight':
            case 'd':
                this.#moveRight();
                this.#confirm(copy);
                this.#render();
                this.#judgement();
                break;
        }

        this.#updateState();
    }

    // MARK:updateState
    #updateState() {
        switch(this.#gameState) {
            case Game.STATE_GAMEOVER:
                this.#messageDOM.innerText = "GAME OVER；；";
                break;
            case Game.STATE_GAMECLEAR:
                this.#messageDOM.innerText = "GAME CLEAR ＜３";
                break;
        }
    }

    // MARK:judgement
    #judgement() {

        let checker = this.#fieldState.length

        for (let i = 0; i < this.#FIELD_SIZE; i++) {
            for (let j = 0; j < this.#FIELD_SIZE; j++) {
                if (this.#field[i][j] == 8) {
                    // this.#gameState = Game.STATE_GAMECLEAR;
                    break;
                }
            }
        }

        // 最後まで来たらダメおなじのあったらりたーん
        if (checker == 16) {
            for (let i = 0; i < this.#FIELD_SIZE; i++) {
                for (let j = 0; j < this.#FIELD_SIZE; j++) {
                    if (j - 1 != -1 && this.#field[i][j] == this.#field[i][j - 1]) {
                        return;
                    } else if (j + 1 != 4 && this.#field[i][j] == this.#field[i][j + 1]) {
                        return;
                    } else if (i - 1 != -1 && this.#field[i][j] == this.#field[i - 1][j]) {
                        return;
                    } else if (i + 1 != 4 && this.#field[i][j] == this.#field[i + 1][j]) {
                        return;
                    }
                }
            }
            this.#gameState = Game.STATE_GAMEOVER;
        }
        
        // if (checker == 16) {
        //     for (let i = 0; i < this.#FIELD_SIZE; i++) {
        //         for (let j = 0; j < this.#FIELD_SIZE; j++) {
        //             if (j - 1 != -1 && this.#field[i][j - 1] == 0 && this.#field[i][j] != this.#field[i][j - 1]) {

        //             }
        //         }
        //     }
        //     // this.#gameState = Game.STATE_GAMEOVER;
        // }
    }
    
        // let check = this.#fieldState.findIndex(data => data[0] == x && data[1] == y);
}

const game = new Game();
