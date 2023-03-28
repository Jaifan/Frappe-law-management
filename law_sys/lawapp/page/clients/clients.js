
frappe.pages['clients'].on_page_load = function(wrapper) {
	new MyPage(wrapper)
}
MyPage = Class.extend({
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Clients',
			single_column: false,
			custom_page: true
		});
		this.parent = wrapper;
		this.page = this.parent.page;
		// this.page.sidebar.html(
		// 	`<ul class="standard-sidebar leaderboard-sidebar overlay-sidebar"></ul>`
		// );
		// this.$sidebar_list = this.page.sidebar.find("ul");
		this.make();
		$("#clientsButton").click(() => {
			frappe.route_options = {}
			location.href="/app/client/new-client-1"
			// frappe.set_route(`/app/client/new-client-1`);
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

	make: function(){
		let me = $(this);
		let finalData = null
		function makeQuery(){
			recent_cases_query = "SELECT client, case_title, description, start_date, case_status_workflow FROM `tabCase` ORDER BY modified DESC"
			
			frappe.call({
				method: "law_sys.lawapp.page.overview.overview.query_database", //dotted path to server method
				args: {query: recent_cases_query},
				callback: function(r) {
					// $("#queryResult")[0].innerText = JSON.stringify(r.message.reply)	
					finalData = r.message.reply
					makeTable(r.message.reply)
					console.log(r.message["reply"])
				}
			});
		}
		function makeTable(queryData){
			// let datatable = new DataTable('#queryResult', {
			// 	columns: ['Client', 'Case Number', 'Case Description', 'Beginning Date', 'Status'],
			// 	data: queryData,
			// 	layout: "fluid",
			// });
			
			datatable = new DataTable('#queryResult', {
				columns: ['Client', 'Case Title', 'Case Description', 'Beginning Date', 'Status'],
				data: [
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
					["Alan", "Case-0001", "Property Case", "20-2-2022", "Processing"],
				],
				layout: "fluid",
			});
		}
		makeQuery();
		setTimeout(()=>{
			console.log("rendering")
		}, 3000);
		$(frappe.render_template('clients', this)).appendTo(this.page.main)
	}

})

