import frappe
from datetime import date

@frappe.whitelist()
def employee_data():
    #return frappe.db.sql("""SELECT full_name, title, type_of_job, name, profile_picture FROM `tabEmployee` ORDER BY type_of_job DESC""", as_dict=True)
    return ["Mr Zuhaib",]