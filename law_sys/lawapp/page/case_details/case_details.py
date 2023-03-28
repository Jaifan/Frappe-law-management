import frappe

@frappe.whitelist()
def case_data(case_data):
    #files = frappe.db.sql("""SELECT * FROM `tabFile` WHERE attached_to_name='{}'""".format(case_data), as_dict=True)
    #data = frappe.db.sql("""SELECT * FROM `tabCase Doctype` WHERE case_number='{}'""".format(case_data), as_dict=True)
    #return data, files
    
    return 0
