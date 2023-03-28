import frappe
from datetime import date
from datetime import timedelta

CASE_DOCTYPE = 'Case'
CLIENT_DOCTYPE = 'Client'
@frappe.whitelist()
def get_total_requests():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` where case_status_workflow='Draft' """.format(CASE_DOCTYPE), as_dict=True)[0].total
    return 10
@frappe.whitelist()
def total_clients():
    #return frappe.db.sql("""SELECT count(*) as total FROM `tab{}`""".format(CLIENT_DOCTYPE), as_dict=True)[0].total
    return 15
@frappe.whitelist()
def successfull_cases():
    #return frappe.db.sql("""SELECT count(name) as total FROM `tab{}` WHERE case_status_workflow='Won'""".format(CASE_DOCTYPE), as_dict=True)[0].total
    return 20
@frappe.whitelist()
def satisfied_clients():
    #return frappe.db.sql("""SELECT DISTINCT first_name, middle_name, last_name FROM `tab{0}` INNER JOIN `tab{1}` ON `tab{1}`.client = `tab{0}`.name AND case_status_workflow ='Won';""".format(CLIENT_DOCTYPE, CASE_DOCTYPE), as_dict=True)
    return 10
@frappe.whitelist()
def new_clients():
    #return frappe.db.sql("""SELECT DISTINCT first_name, middle_name, last_name FROM `tab{0}` INNER JOIN `tab{1}` ON `tab{1}`.client = `tab{0}`.name AND case_status_workflow ='Draft';""".format(CLIENT_DOCTYPE, CASE_DOCTYPE), as_dict=True)
    return 15
@frappe.whitelist()
def status_chart():
    #return frappe.db.sql("""SELECT COUNT(*), case_status_workflow FROM `tab{}` GROUP BY case_status_workflow;""".format(CASE_DOCTYPE))
    return 20
@frappe.whitelist()
def status_chart_2():
    #output = frappe.db.sql("""SELECT creation FROM `tab{}`""".format(CASE_DOCTYPE))
    today = date.today()
    output = list('2023-03-23 12:05:22.154336')
    lastDates = []
    for i in range(7):
        d = today - timedelta(days=i)
        lastDates.append(d)
    return [output, lastDates]
@frappe.whitelist()
def query_database(query):
    data = {'reply': 0}
    #content = frappe.db.sql(f"""{query}""")
    #data["reply"] = content
    return {'reply' : 0}

