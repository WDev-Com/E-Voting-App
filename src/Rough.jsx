let newFilter = {};

function Check(section, option) {
  if (newFilter[section]) {
    // If newFilter[section] already exists and is an array, push to it
    if (Array.isArray(newFilter[section])) {
      newFilter[section].push(option);
    } else {
      // If newFilter[section] is not an array, convert it to an array and push to it
      newFilter[section] = [newFilter[section], option];
    }
  } else {
    // If newFilter[section] does not exist, create it as an array with the first element
    newFilter[section] = [option];
  }
}

Check("ele", "lap");
console.log(newFilter);

Check("ele", "pap");
console.log(newFilter);

Check("tel", "pap");
console.log(newFilter.ele);
