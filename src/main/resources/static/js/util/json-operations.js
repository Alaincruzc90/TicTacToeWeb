// -----------------
/* JSON OPERATIONS */
// -----------------

// Convert a form's data into a JSON object.
function toJSONString(form) {

    // Object where we will add all the needed attributes.
    let obj = {};

    // All the elements, may they be inputs, selects or text areas, contained in the form.
    const elements = form.querySelectorAll( "input, select, textarea" );

    // Loop through each form and add as a new key.
    for(let i = 0; i < elements.length; ++i ) {
        const element = elements[i];
        const name = element.name;
        const value = element.value;
        if( name ) {
            obj[ name ] = value;
        }
    }

    // Return the form's data as a JSON object.
    return JSON.stringify(obj);
}