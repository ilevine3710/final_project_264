public class Hole {
    private int par;
    private int score;
    public Hole (int par) {
        this.par = par;
        score = 0;
    }
    public int getPar() {
        return par;
    }
    public void setPar(int par) {
        this.par = par;
    }
    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }
}