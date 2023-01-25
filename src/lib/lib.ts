//日期
class DateMaker {

    fillZero(number: number) {
        return number < 10 ? '0' + number : number;
    }

    now() {

        const date = new Date();
        const fillZero = this.fillZero;

        return `${date.getFullYear().toString()}/${fillZero(date.getMonth() + 1)}/${fillZero(date.getDate())} ${fillZero(date.getHours())}:${fillZero(date.getMinutes())}:${fillZero(date.getSeconds())}`;

    }


}

export { DateMaker };