let divItems = document.getElementById("items");
let divItemsEscolhidos =  document.getElementById("items-escolhidos");

let aux = "";
let carrinho = []

let imagens = ["image-waffle-desktop.jpg","image-creme-brulee-desktop.jpg", "image-macaron-desktop.jpg", "image-tiramisu-desktop.jpg", "image-baklava-desktop.jpg", 
    "image-meringue-desktop.jpg", "image-cake-desktop.jpg", "image-brownie-desktop.jpg",
    "image-panna-cotta-desktop.jpg"]
let nomes = ["Waffle with Berries", "Vanilla Bean Crème Brûlée", "Macaron Mix of Five", "Classic Tiramisu",
    "Pistachio Baklava", "Lemon Meringue Pie", "Red Velvet Cake", "Salted Caramel Brownie", "Vanilla Panna Cotta"
]
let descricao = ["Waffle", "Crème Brûlée", "Macaron", "Tiramisu", "Baklava", "Pie", "Cake", "Brownie", "Panna Cotta"]
let preco = [6.50, 7.00, 8.00, 5.50, 4.00, 5.00, 4.50, 4.50, 6.50]

for (let i = 0; i < nomes.length; i++) {
    
    aux += `<div class="item" id="${i}">
                <img images id="img-${i}" src="assets/images/${imagens[i]}" alt="">
                <button id="btn-${i}" onclick="AumentarQuantidade(this.id)">
                    <img src='assets/images/icon-add-to-cart.svg' class='meu-icone'>Add to Cart
                </button>
                <p class="descricao">${descricao[i]}</p>
                <p class="nome">${nomes[i]}</p>
                <p class="preco">$${preco[i].toFixed(2)}</p>
                
            </div>`
}

divItems.innerHTML = aux;

function AumentarQuantidade(id) {
    
    let aux4

    aux4 = id.split("-")
    carrinho.push(aux4[1])
    AdicionaCarrinho(id, aux4[1])
}

function Excluir(id) {
    
    let aux5 = id.split("-")[1]
    let index = 0;

    while (index != -1) {
        
        index = carrinho.indexOf(aux5);

        if (index > -1) {
            carrinho.splice(index, 1)
        }
    }

    let aux6 = "btn-" + aux5

    AdicionaCarrinho(aux6, aux5)
    
}

function DiminuirQuantidade(id) {

    let aux4 = ""

    aux4 = id.split("-")
    
    const index = carrinho.indexOf(aux4[1]);
    
    if (index > -1) { 
        carrinho.splice(index, 1);
    }

    AdicionaCarrinho(id, aux4[1])
}

function AdicionaCarrinho(idbtn, id) {

    let TqtProdutos = document.getElementById("TqtProdutos")
    let qtProdutos = 0;

    let Btn = document.getElementById(idbtn)

    const index = carrinho.indexOf(id);

    if(!(index > -1)){

        let Btn = document.getElementById(idbtn)
        Btn.classList.remove('BtnEscolhido')
        Btn.innerHTML = "<img src='assets/images/icon-add-to-cart.svg' class='meu-icone'>Add to Cart"
        Btn.disabled = false;

        let image = document.getElementById(`img-${id}`)
        image.style.border = "none"

    }else{
        
        if (Btn.disabled == false) {

            Btn.disabled = true;
        }
    }

    let aux2 = ""
    let aux3 = []
    let total = 0;
    let totalCompra = 0;
    
    for (let i = 0; i < carrinho.length; i++) {
        
        let imgAtual = document.getElementById(`img-${carrinho[i]}`)
        const qt = carrinho.filter(x => x === carrinho[i]).length;

        if (aux3.includes(carrinho[i]) == false) {

            if (qt >= 1) {
                
                let btnAtual = document.getElementById(`btn-${carrinho[i]}`);

                imgAtual.style.border = "2px solid hsl(14, 86%, 42%)"

                btnAtual.classList.add('BtnEscolhido')
                btnAtual.innerHTML = `<i class='material-icons' onclick='DiminuirQuantidade(this.parentNode.id)'>remove_circle_outline</i><p>${qt}</p><i class='material-icons' onclick='AumentarQuantidade(this.parentNode.id)'>add_circle_outline</i>`
            
                divItemsEscolhidos.style.display = 'block'
            }

            total = (preco[carrinho[i]]*qt).toFixed(2)

            aux2 += `<div class="item-escolhido" id="div-escolhido-${carrinho[i]}">

                    <div class="espacamento">
                        <p class="nome nomeCarrinho">${nomes[carrinho[i]]}</p>
                        <span class="material-symbols-outlined" id="escolhido-${carrinho[i]}" onclick="Excluir(this.id)">cancel</span>
                    </div>

                    <p class="quantidade">${qt}x</p>
                    <p class="preco">@ ${preco[carrinho[i]].toFixed(2)}</p>
                    <p class="totalitem">$${total}</p>
                    <hr>
                </div>

                `
            totalCompra = parseFloat(total) + parseFloat(totalCompra)
            aux3.push(carrinho[i])
            qtProdutos = qtProdutos + qt
        }
    }

    aux2 += `<div class="totalcompra">
                <p>Order Total</p>
                <p class="total">$${totalCompra.toFixed(2)}</p>
            </div>
                
            <div class="carbono">
                <img src="assets/images/icon-carbon-neutral.svg">
                <p>This is a <b>carbon-neutral</b> delivery</p>
            </div>

            <button id="buttonConfirma">Confirm Order</button>`

    TqtProdutos.innerHTML = `Your Cart (${qtProdutos})`

    if (qtProdutos < 1) {

        divItemsEscolhidos.style.display = 'flex'
        divItemsEscolhidos.innerHTML = `<img src="assets/images/illustration-empty-cart.svg" alt="">
        <p>Your added items will appear here</p>
      `
    }else{

        divItemsEscolhidos.innerHTML = aux2;

        const buttonConfirma = document.getElementById("buttonConfirma")
        const modal = document.querySelector("dialog")
        const buttonFinaliza = document.getElementById("buttonFinaliza")

        buttonConfirma.onclick = function () {
            modal.showModal()
        }

        buttonFinaliza.onclick = function () {
            modal.close()
        }

        let produtosFinais = document.getElementById("produtosFinais")
        let aux7 = ""

        aux3.forEach(element => {

           const qt = carrinho.filter(x => x === element).length;

            aux7 += `<div class="produtoFinal">

                        <img src="assets/images/${imagens[element]}" alt="">
                        <div class="notaFiscal">
                            <p class="nome">${nomes[element]}</p>
                            <div>
                            <p class="quantidade">${qt}x</p>
                            <p class="preco">@ $${(preco[element]).toFixed(2)}</p>
                            </div>
                        </div>
                        <p class="totalNota">$${(preco[element]*qt).toFixed(2)}</p>

                        <hr>

                    </div>`
        });

        aux7 += `<div class="totalcompraFinal">
          <p>Order Total</p>
          <p class="compraFinal">$${(totalCompra).toFixed(2)}</p>
        </div>`
        produtosFinais.innerHTML = aux7
    }

}
