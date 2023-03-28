

frappe.pages['jai-demo2'].on_page_load = function(wrapper) {
	new MyPage(wrapper)
}

MyPage = Class.extend({
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Demo-2',
			custom_page: true
		});
		this.make();
	},

	make: function(){
		
		$(frappe.render_template("jai_demo2", this)).appendTo(this.page.main);
	}
});