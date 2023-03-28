import frappe

CASE_DOCTYPE = 'Case'
@frappe.whitelist()
def total_cases():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 5

@frappe.whitelist()
def active_cases():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` where case_status_workflow='Processing' """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 5
    

@frappe.whitelist()
def appealed_cases():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` where case_status_workflow='Draft' """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 5
    

@frappe.whitelist()
def finished_cases():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` where case_status_workflow in ('Won', 'Lost', 'Cancel') """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 5

@frappe.whitelist()
def cases_won():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` where case_status_workflow='Won' """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 5
