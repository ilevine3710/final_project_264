public class Round {
    private String player;
    private String courseName;
    private Hole [] holes;
    private int courseLength;
    private int finalScore;
    private Date date;
    public Round () {

    }
    public void addScore (int index, int score) {
        holes[index].setScore(score);
    }
    public Date getDate() {
        return date;
    }
    public void setDate(String date) throws InvalidDateTimeException {
        this.date = new Date (date);
    }
    public String getPlayer() {
        return player;
    }
    public void setPlayer(String player) {
        this.player = player;
    }
    public int getCourseLength() {
        return courseLength;
    }
    public String getCourseName() {
        return courseName;
    }
    public void setCourseName(String courseName) throws CourseNotFoundException {
            switch (courseName) {
                case ("Jordan River"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    break;
                case ("South Mountain"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    break;
                case ("Covered Bridge Park"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    break;
                case ("Camp Olympic Park"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    break;
                case ("Hanover Community Center"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    holes[4] = new Hole(4);
                    holes[13] = new Hole(4);
                    holes[15] = new Hole(4);
                    break;
                case ("Moore Township"):
                    this.courseName = courseName;
                    holes = new Hole [18];
                    courseLength = 18;
                    for (int i = 0; i < holes.length; i++) {
                        holes[i] = new Hole(3);
                    }
                    holes[12] = new Hole(4);
                    holes[15] = new Hole(4);
                    holes[17] = new Hole(4);
                    break;
                default:
                    throw new CourseNotFoundException();
            }
    }
    public Hole[] getHoles() {
        return holes;
    }
    public void setHoles(Hole[] holes) {
        this.holes = holes;
    }
    public int getScore (int index) {
        return holes[index].getScore();
    }
    public int getPar (int index) {
        return holes[index].getPar();
    }
    public void setScore (int index, int score) {
        holes[index].setScore(score);
    }
    public int getFinalScore() {
        return finalScore;
    }
    public String getTotalScoreString() {
        String s = "";
        int totalScore = 0;
        int totalPar = 0;
        for (int i = 0; i < getCourseLength(); i++) {
            totalScore += getHoles()[i].getScore();
            totalPar += getHoles()[i].getPar();
        } 
        finalScore = totalScore - totalPar;
        if (finalScore > 0) {
            s = "+" + finalScore;
        } else if (finalScore < 0) {
            s = "" + finalScore;
        } else {
            return "E";
        }
        return s;
    }
    public String toString () {
        String s = String.format("%-12s%-18s%-30s%-15s", date, player, courseName, getTotalScoreString());
        for (int i = 0; i < holes.length; i++) {
            s += String.format("%-6s", getScore(i));
        }
        return s;
    }
    public String toString (int hole) {
        String s = String.format("%-12s%-18s%-30s%-15s", date, player, courseName, getTotalScoreString());
        s += String.format("%-6d", getScore(hole - 1));
        return s;
    }
}
