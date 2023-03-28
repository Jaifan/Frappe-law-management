
frappe.pages['employees'].on_page_load = function(wrapper) {
	new MyPage(wrapper)
}
MyPage = Class.extend({
	init: function(wrapper){
			this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Employees',
			custom_page: true
		});
		this.make();
		$("#employeeButton").click(() => {
			frappe.route_options = {}
			frappe.set_route(`/app/agent/new-agent-1`);
		});	
	},


	make: function(){
		let me = $(this);
		let cleanObject=function(value){
			const output = value.reduce((acc, curr) => {
				if (acc[curr.type_of_job]) {
				  acc[curr.type_of_job].push(curr);
				} else {
				  acc[curr.type_of_job] = [curr];
				}
				return acc;
			  }, {});
			console.log(output)
			return output;
		} 
		let employee_data = function(){
			frappe.call({
				method: "law_sys.lawapp.page.employees.employees.employee_data", //dotted path to server method
				callback: function(r) {
					clean_emp_data = cleanObject(r.message)
					if (Object.keys(clean_emp_data).length === 0){
						$(".employee-list-div").append(`<h4 class="text-primary mt-3">No Employees</h4>`)
					}
					Object.entries(clean_emp_data).forEach(([jobType, data])=>{
						$(".employee-list-div").append(`<h3 style="padding: 3% 0% 0% 0%">jobType</h3>`)

						jobType = jobType.replace(" ", "-")
						jobType = jobType.replace(" ", "-")
						$(".employee-list-div").append(`<div class="card-columns" id="${jobType}"></div>`)
						let cards = ""
						data.forEach(empData => {
							console.log(empData, jobType)
							let cardData = `<div class="card" id="${empData.name}" style="text-align: center;">	`
							if (empData.profile_picture != null)
								cardData +=	`<img class="rounded-circle pfp" alt="avatar1" src="/assets/frappe/images/default-avatar.png" />`
								// cardData +=	`<img class="rounded-circle pfp" alt="avatar1" src="${empData.profile_picture}" />`
							else
								cardData +=	`<img class="rounded-circle pfp" alt="avatar1" src="/assets/frappe/images/default-avatar.png" />`
							cardData +=	`<div class="card-body">
										<h5 class="card-title text-dark">${empData.full_name}</h5>
										<p class="card-text">${ empData.title == null ? "No Title" : empData.title}</p>
									</div>
								</div>`
								$(`#${jobType}`).append(`${cardData}`);
								$(`#${empData.name}`).click(()=>{				
									// location.href=`case-task/new-case-task-1?case=${empData.name}`
									//location.href=`employee-page-team/?employee=${empData.name}`
									location.href=`employee_details?agent=HTLawyer-57ff982131`

								})
							});
					})
				}
			});
		}
		$(frappe.render_template(frappe.cases_page_dashboard.body, this)).appendTo(this.page.main)
		employee_data();
	}

})

let body=`

<div class="container-fluid align-items-center" style="position:absolute; height: 100%;">
	
	<button id="employeeButton" type="button" class="float-right btn btn-outline-dark">+ Add new Employee</button>
	<h3 style="Padding-bottom: 3%"></h3>

	<div class="overflow-auto employee-list-div border border-dark" style="padding-left: 2%; max-width: 100%; max-height: 550px; ">
		</div>
</div>

<style>
.card{
	cursor: pointer;
}
.card-columns{
	column-count: 5;
}
.pfp{
	
	width: 125px;
	height: 125px;
	padding-top: 2%;
	border-bottom: 3px dotted black; 
	object-fit:cover;
}
.embed-responsive .card-img-top {
    object-fit: cover;
}
.dark-mode .datatable {
	--dt-border-color: #424242;
	--dt-light-bg: #2e3538;
	--dt-text-color: #dfe2e5;
	--dt-text-light: #dfe2e5;
	--dt-cell-bg: #1c1f20;
	--dt-focus-border-width: 1px;
	--dt-selection-highlight-color: var(--dt-light-bg);
	--dt-toast-message-border: 1px solid var(--dt-border-color);
	--dt-header-cell-bg: #262c2e;
}
</style>`

frappe.cases_page_dashboard = {
	body: body
}