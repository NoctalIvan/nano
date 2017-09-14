function nano(template, data) {
	console.log("template ", template, "data", data)
	// searches for [] content
	template = template.replace(/(\[[\s\S]*\])/g, function(str, key){		
		// get first {} match
		var match = str.match(/\[{(\S+)}([\s\S]*)\]/);
		return data[match[1]].map(d => nano(match[2], d)).join("");
	})
	
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}
