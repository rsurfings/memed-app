var datackeckout = [];
var medicines = function() {
	
	var btncheckout = document.getElementById("checkout");
	btncheckout.style.display = 'none';

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			build(arr);
		}
	};

	xhttp.open("GET", "http://localhost:8000/medicines", true);
	xhttp.send();

	var build = function(arr) {
		
		var footer = document.getElementById("pharmacy");
		footer.style.display = 'block';
		
		var title = document.getElementById("memed-title");
		title.innerHTML = 'Dr.Memed';

		var list = document.getElementById("list");
		list.innerHTML = '';

		for (i = 0; i < arr.length; i++) {

			var node = document.createElement("LI");
			node.classList.add("mdl-list__item");
			var content = document.createElement("SPAN");
			content.classList.add("mdl-list__item-primary-content");
			node.appendChild(content);

			var textnode = document.createTextNode(arr[i]);
			content.appendChild(textnode);
			document.getElementById("list").appendChild(node);

		}
	}
}

var pharmacy = function(){

	var loc = {
		'lat' : '-23.5648304',
		'lon' : '-46.6436604'
	};

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			build(arr);
		}
	};

	xhttp.open("GET", "http://localhost:8000/pharmacy?data="
			+ encodeURIComponent(JSON.stringify(loc)), true);
	xhttp.send();

	var build = function(arr) {
		
		datackeckout = arr;
		
		var btncheckout = document.getElementById("checkout");
		btncheckout.style.display = 'block';
		
		var linkphamacy = document.getElementById("pharmacy");
		linkphamacy.style.display = 'none';

		var title = document.getElementById("memed-title");
		title.innerHTML = '<i class="material-icons">arrow_back</i> Encontrar Farmácia';
		
		title.addEventListener("click", function(e) {
			e.preventDefault();
			medicines();
		});

		var list = document.getElementById("list");
		list.innerHTML = '';

		var node = document.createElement("LI");
		node.classList.add("mdl-list__item");
		var content = document.createElement("SPAN");
		content.classList.add("mdl-list__item-primary-content");
		node.appendChild(content);

		var textnode = document.createTextNode(arr['nome'] + '(a '
				+ arr['distance'] + ' metros)');
		content.appendChild(textnode);

		var textnodetotal = document.createElement("P");
		content.appendChild(textnodetotal);

		var textnodeprice = document.createTextNode('(R$'
				+ arr['totalprice'] + ')');
		content.appendChild(textnodeprice);

		document.getElementById("list").appendChild(node);

		var data = arr.info;
		for (i = 0; i < data.length; i++) {

			var node = document.createElement("LI");
			node.classList.add("mdl-list__item");
			var content = document.createElement("SPAN");
			content.classList.add("mdl-list__item-primary-content");
			node.appendChild(content);

			var textnode = document.createTextNode(data[i]['nome']);
			content.appendChild(textnode);
			
			var textnodeprice = document.createTextNode('(R$'
					+ data[i]['preco'] + ')');
			content.appendChild(textnodeprice);

			document.getElementById("list").appendChild(node);
		}
	}
}

var element = document.getElementById("pharmacy");
element.addEventListener("click", function(e) {
	e.preventDefault();
	pharmacy();
});

var btncheckout = document.getElementById("checkout");
btncheckout.addEventListener("click", function(e) {
	e.preventDefault();
		
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		console.log(this.response);
	};

	xhttp.open("POST", "http://localhost:8000/checkout", true);
	xhttp.send(JSON.stringify(datackeckout));
});
