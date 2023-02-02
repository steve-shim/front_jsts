class CartV2 {
    static createItem = (name, price) => ({
        name, price
    });

    // static createItem = (name, price) => {
    //     return { name: name, price: price }
    // };

    cart;
    currentId;

    constructor(){
        this.currentId = 0;
        this.cart = [];
    }

    getNewId = () => {
        this.currentId++;
        return this.currentId;
    }

    addItem = item => {
        this.cart.push({
            ...item,
            id: this.getNewId(),
        });
    }

    clearCart = () =>{
        this.currentId = 0;
        this.cart = [];
    }
}

const shoppingCartV2 = new CartV2();
// static method는 인스턴스로 접근불가하고 클래스로 접근 가능하다
console.log(CartV2.createItem('ssh',100));
shoppingCartV2.addItem(CartV2.createItem('수박', 8000));
shoppingCartV2.addItem(CartV2.createItem('사과', 12000));
shoppingCartV2.addItem(CartV2.createItem('두부', 2000));

console.log(shoppingCartV2.cart);