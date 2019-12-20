
/*
Create a Class Baseroute, this Class contains only a Method methods(), that return a methods from a Class without Constructor
and a protect methods
 */
class BaseRoute {
    static methods(){
        return Object.getOwnPropertyNames(this.prototype)
                     .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }
}
module.exports = BaseRoute