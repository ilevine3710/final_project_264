public class InvalidDateTimeException extends Exception{
    public InvalidDateTimeException(){
        super("Invalid Date Format.");
    }
    public InvalidDateTimeException(String message){
        super(message);
    }
}