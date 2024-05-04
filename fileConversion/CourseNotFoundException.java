public class CourseNotFoundException extends Exception{
    public CourseNotFoundException(){
        super("Invalid Course Name");
    }
    public CourseNotFoundException(String message){
        super(message);
    }
}
