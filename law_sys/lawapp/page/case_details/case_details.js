
frappe.pages['case-details'].on_page_load = function(wrapper) {
	new MyPage(wrapper)
}
MyPage = Class.extend({
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Case Details',
			custom_page: true
		});
		this.parent = wrapper;
		this.page = this.parent.page;
		// this.page.sidebar.html(
		// 	`<ul class="standard-sidebar leaderboard-sidebar overlay-sidebar"></ul>`
		// );
		// this.$sidebar_list = this.page.sidebar.find("ul");
		this.make();
		$("#invoiceButton").on("click", ()=>{
			let d = new frappe.ui.Dialog({
				title: 'Enter details',
				fields: [
					{
						label: 'Invoice value',
						fieldname: 'invoice_value',
						fieldtype: 'Int',
						reqd: 1
					},
					{
						label: 'Address Invoice',
						fieldname: 'address_invoice',
						fieldtype: 'Data',
						reqd: 1
					},
					{
						label: 'Receipt',
						fieldname: 'receipt',
						fieldtype: 'Attach',
						reqd: 1
					}
				],
				primary_action_label: 'Submit',
				primary_action(values) {
					console.log(values);
					d.hide();
				}
			});
			
			d.show();
		})
		
	},

	make: function(){
		let me = $(this);
		let finalData = null
		let data = frappe.route_options.case
		console.log("case deatils " + data)
		let context = {}
		frappe.call({
			method: "law_sys.lawapp.page.case_details.case_details.case_data",
			args: {case_data: data},
			callback: function(r) {
				// clean_emp_data = r.message
				//console.log(r.message)
				//context['data'] = r.message[0][0]
				//context['file'] = r.message[1][0]
			},
			async: false
		});
		context['title'] = data
		$(frappe.render_template('case_details', context)).appendTo(this.page.main)
	}

})

