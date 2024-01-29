let newFilter = {};

function fuck(section, option) {
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

fuck("ele", "lap");
console.log(newFilter);

fuck("ele", "pap");
console.log(newFilter);

fuck("tel", "pap");
console.log(newFilter.ele);
