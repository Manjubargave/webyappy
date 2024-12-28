import { deparment_microapps } from "./CardData";

export const findAssignedDepartmentSections = ( assignedApps) => {
    const results = [];
  console.log("Inside find assigned department sections",assignedApps)
    deparment_microapps.forEach((department) => {
      Object.keys(department).forEach((section) => {
        // Skip `department` key
        if (section === "department") return;
  
        // Check if the assigned apps are present in the section
        const appsInSection = department[section].filter((app) =>
          assignedApps.includes(app)
        );
       // console.log("appsinSection",appsInSection)
  
        if (appsInSection.length > 0) {
          results.push({
            department: department.department,
            section: section,
            apps: appsInSection,
          });
        }
      });
    });
  
    return results;
  };