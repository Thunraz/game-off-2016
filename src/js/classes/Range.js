class Range {
    // ##############################################
    // # Constructor ################################
    // ##############################################
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    // ##############################################

    random(integer) {
        let value = Math.random() * this.max + this.min;

        if(integer) {
            value = Math.round(value);
            return value > this.max ? this.max : value;
        } else {
            return value;
        }
    }

    // ##############################################
}

export default Range;