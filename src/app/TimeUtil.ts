export class TimeUtil {
    public static numberPlural(n: number, unit: string){
        if(n != 1){
            return n + " " + unit + "s"
        }else{
            return n + " " + unit;
        }
    }
}
