// frappe.pages['jai-demo'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Demo Page',
// 		single_column: true
// 	});
// }



frappe.pages['jai-demo'].on_page_load = function(wrapper) {
	new MyPage(wrapper)
}
MyPage = Class.extend({
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Jai-Demo',
			custom_page: true
		});
		// if (frappe.session.user != "Administrator"){
		// 	this.notFound()
		// 	return
		// }
		if(!frappe.session.user_fullname.includes("Admin")){
			location.href = "/app/dashboard-head"
		}
		this.make();
		$("#casesButton").click(() => {
			frappe.route_options = {}
			frappe.set_route(`/app/case`);
		});	
		$("#total_clients_card").click(() => {
			frappe.route_options = {}
			frappe.set_route(`/app/case`);
		});		
		$("#satisfied_clients_card").click(() => {
			let value = $("#satisfied_clients")[0].getAttribute("data-items");
			var obj = JSON.parse(value);
			obj = this.parseObject(obj)
			frappe.route_options = obj;
			frappe.set_route(`/app/client`);
		});
		$("#successfull_cases_card").click(() => {
			
			frappe.route_options = {
				status: `Approved`
			}
			frappe.set_route(`/app/case`);
		});
		$("#total_requests_card").click(() => {

			frappe.route_options = {
				status: `Draft`
			}
			frappe.set_route(`/app/case`);
		});
		
		$("#new_clients_card").click(() => {

			let value = $("#new_clients")[0].getAttribute("data-items");
			
			var obj = JSON.parse(value);
			obj = this.parseObject(obj)
			frappe.route_options = obj;
			frappe.set_route(`/app/client`);
		});
	},

	parseObject: function(value){
		let parseToObject=function(value){
			output = value.reduce((r, o) => {
				Object.entries(o).forEach(([k, v]) => {
					if (k in r) {
						r[k][1].push(v);
					} else {
						r[k] = ["in", []];
						r[k][1].push(v)
					}
				});
				return r;
			}, {});
			console.log(output)
			return output;
		} 
		return parseToObject(value);
	},
	// notFound: function(){
	// 	$(frappe.render_template("overview", {frappe:frappe})).appendTo(this.page.main)
	// },
	make: function(){
		let me = $(this);
		
		console.log(frappe.session)
		const compareArrays = (arr1, arr2) => {
			const result = {};
		  
			//loop through first array, add each string as a key and set value to 0
			arr1.forEach(str => {
			  result[str] = 0;
			});
		  
			//loop through second array, if string is already in object, add 1, else set value to 0
			arr2.forEach(str => {
			  if (result[str] !== undefined) {
				result[str] += 1;
			  } else {
				result[str] = 1;
			  }
			});
		  
			return result;
		  };
		let status_chart = function(){
			
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.status_chart_2", //dotted path to server method
				callback: function(r) {
					let status = []
					let values = []
					let dataset = []
					let caseTimes = r.message[0].map(val => val[0].split(" ")[0]);
					console.log(caseTimes)
					let output = compareArrays(r.message[1], caseTimes)
		
					console.log(dataset)
					
					let chart = new frappe.Chart( "#frost-chart", { // or DOM element
						data: {
							labels: Object.keys(output),
							datasets: [
								{
									values: Object.values(output),
									chartType: 'line',
								},
							],
						},
						title: "Cases Data",
						type: 'axis-mixed',
						lineOptions: {
							dotSize: 8, // default: 4,
							regionFill: 1
						},
						height: 300,
						colors: ['lightblue', "blue"],
						axisOptions: {
							xAxisMode: "tick",
							xIsSeries: true
						  },
						  barOptions: {
							spaceRatio: 0.5
						  },
						  tooltipOptions: {
							formatTooltipX: (d) => (d + "").toUpperCase(),
							formatTooltipY: (d) => d + " cases"
						  }
					  });					
	
				}
			});
		}
		let total_clients = function(){
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.total_clients", //dotted path to server method
				callback: function(r) {
					$("#total_clients")[0].innerText = r.message;
				}
			});
		}
		
		
		let satisfied_clients = function(){
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.satisfied_clients", //dotted path to server method
				callback: function(r) {
					$("#satisfied_clients")[0].innerText = 25;
					$("#satisfied_clients")[0].setAttribute("data-items", JSON.stringify(r.message))
				}
			});
		}
		
		let successfull_cases = function(){
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.successfull_cases", //dotted path to server method
				callback: function(r) {
					$("#successfull_cases")[0].innerText = r.message;
				}
			});
		}
		

		let total_requests = function(){
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.get_total_requests", //dotted path to server method
				callback: function(r) {
					$("#total_requests")[0].innerText = r.message;
				}
			});
		}
		

		let new_clients = function(){
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.new_clients", //dotted path to server method
				callback: function(r) {
					$("#new_clients")[0].innerText = 20;
					
					$("#new_clients")[0].setAttribute("data-items", JSON.stringify(r.message))
				}
			});
		}

		let main_chart = function(){
		}

		function makeQuery(){
			recent_cases_query = "SELECT client, case_title, description, start_date, case_status_workflow FROM `tabCase` ORDER BY modified DESC LIMIT 5"
			
			frappe.call({
				method: "law_sys.lawapp.page.jai_demo.jai_demo.query_database", //dotted path to server method
				args: {query: recent_cases_query},
				callback: function(r) {
					//$("#queryResult")[0].innerText = JSON.stringify(r.message.reply)	
					makeTable()
					console.log(r.message["reply"])
				}
			});
		}
		
		function makeTable(){
			let datatable = new DataTable('#queryResult', {
				columns: ['Client', 'Case Number', 'Case Description', 'Beginning Date', 'Status'],
				data: [
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"]

				],
				layout: "fluid",
			});
			// datatable.style.setStyle('.dt-cell--row-0', {
			// 	backgroundColor: '#000'
			// });
		}

		$(frappe.render_template("jai_demo", {frappe:frappe})).appendTo(this.page.main)

		total_clients();
		satisfied_clients();
		successfull_cases();
		total_requests();
		new_clients();
		// main_chart();
		status_chart();
		makeQuery();

		// let time = 0;
		// let minutes = $("#minutes")[0]
		// let seconds = $("#seconds")[0]
		// minutes.innerText = "00"
		// seconds.innerText = "00"
		// let interval = null

		// function calculateTimer(){
		// 	let m = Math.floor(time/60);
		// 	let s = time % 60;
		// 	minutes.innerText = m.toString().padStart(2, "0")
		// 	seconds.innerText = s.toString().padStart(2, "0")
		// }
		// function controlTimer(){
		// 	if (interval == null){
		// 		$("#start")[0].innerText = "Start"
		// 	}
		// 	else{
		// 		$("#start")[0].innerText = "Stop"
		// 	}
		// }
		// function start(){
		// 	interval = setInterval(() => {
		// 		time += 1
		// 		calculateTimer()
		// 	}, 1000)
		// }
		// $("#start").on('click', ()=>{
		// 	if(interval != null){
		// 		clearInterval(interval)
		// 		interval = null
		// 	}
		// 	else{
		// 		start()
		// 	}
		// 	controlTimer()
		// })
	}

})
