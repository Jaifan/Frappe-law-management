import frappe

@frappe.whitelist()
def employee_teams(employee):
    employee_type = frappe.get_value("Employee", employee, "type_of_job")
    data = {}
    print("X"*100, employee)
    if employee_type == "Head Team Lawyer":
        print("*"*100, employee_type, employee)
        data['teams'] = frappe.db.sql("""SELECT `tabEmployee Teams`.*, count(`tabTeamCases`.name) as total_cases FROM `tabEmployee Teams` LEFT JOIN `tabTeamCases` ON `tabTeamCases`.parent = `tabEmployee Teams`.name where `tabEmployee Teams`.head_lawyer='{}' group by `tabEmployee Teams`.name;""".format(employee), as_dict=True)
    else:
        print("="*100, employee_type)
        data['teams'] = frappe.db.sql("""SELECT `tabEmployee Teams`.*, count(`tabTeamCases`.name) as total_cases FROM `tabEmployee Teams` INNER JOIN `tabTeamEmps` ON `tabTeamEmps`.parent = `tabEmployee Teams`.name and `tabTeamEmps`.employee = '{}' INNER JOIN `tabTeamCases` ON `tabTeamCases`.parent = `tabEmployee Teams`.name""".format(employee), as_dict=True)
  
    return data