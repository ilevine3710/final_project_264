public class Date implements Comparable<Date>{
    private int month;
    private int day;
    private int year;

    public Date(){
        month = 1;
        day = 1;
        year = 1970;
    }
    public Date(String date) throws InvalidDateTimeException {
        if(date.matches("\\d{4}-\\d{2}-\\d{2}")){
            String[] items = date.split("-");
            month = Integer.parseInt(items[1]);
            if(month < 1 || month > 12)
                throw new InvalidDateTimeException("Invalid month. Month should be from 1 to 12.");
            day = Integer.parseInt(items[2]);
            if(day < 1 || day > 31)
                throw new InvalidDateTimeException("Invalid day. Day should be from 1 to 31.");
            year = Integer.parseInt(items[0]);
            if(year < 1970 || year > 2030)
                throw new InvalidDateTimeException("Invalid year. Month should be from 1970 to 2030.");
        } else if (date.matches("\\d{2}/\\d{2}/\\d{4}")){
            String[] items = date.split("/");
            month = Integer.parseInt(items[0]);
            if(month < 1 || month > 12)
                throw new InvalidDateTimeException("Invalid month. Month should be from 1 to 12.");
            day = Integer.parseInt(items[1]);
            if(day < 1 || day > 31)
                throw new InvalidDateTimeException("Invalid day. Day should be from 1 to 31.");
            year = Integer.parseInt(items[2]);
            if(year < 1970 || year > 2030)
                throw new InvalidDateTimeException("Invalid year. Month should be from 1970 to 2030.");
        }
        else
          throw new InvalidDateTimeException("Invalid Date Format (mm/dd/yyyy)");
    }
    public int getMonth() { return month;}
    public int getDay() { return day;}
    public int getYear() { return year;}
    public void setMonth(int m) throws InvalidDateTimeException{
        if(m < 1 || m > 12)
            throw new InvalidDateTimeException("Invalid month. Month should be from 1 to 12.");
        month = m;
    }
    public void setDay(int d) throws InvalidDateTimeException{
        if(d < 1 || d > 31)
           throw new InvalidDateTimeException("Invalid day. Day should be from 1 to 31.");
        day = d;
    }
    public void setYear(int y) throws InvalidDateTimeException{
        if(y < 1970 || y > 2030)
                throw new InvalidDateTimeException("Invalid year. Year should be from 1970 to 2030.");
        year = y;
    }
    public String toString(){
        return String.format("%02d/%02d/%04d", month, day, year);
    }
    public int compareTo(Date date){
        if(this.getYear() == date.getYear()){
            if(this.getMonth() == date.getMonth()){
                return this.getDay() - date.getDay();
            }
            return this.getMonth() - date.getMonth();
        }
        return this.getYear() - date.getYear();
    }
}
