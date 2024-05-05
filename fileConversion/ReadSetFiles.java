import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;

public class ReadSetFiles {
    public static void main(String[] args) {;
        saveFiles("pyRounds.csv", readCSVFiles("newRounds.csv"));
    }
    public static void saveFiles (String filename, Round [] total) {
        File file = new File(filename);
        try {
            FileWriter fileWriter = new FileWriter(file,true);
            for (int i = 0; i < total.length; i++) {
                fileWriter.write(total[i].getDate() + ",");
                fileWriter.write(total[i].getPlayer() + ",");
                fileWriter.write(total[i].getCourseName());
                for (int j = 0; j < total[i].getCourseLength(); j++) {
                    fileWriter.write("," + total[i].getScore(j));
                }
                fileWriter.write("\n");
            } fileWriter.close();
        } catch(FileNotFoundException e) {
            System.out.println("Cannot write to file.");
        } catch (Exception e) {
        }
    }
    public static Round [] readCSVFiles (String filename) {
        Round [] rounds;
        try {
            File f = new File(filename);
            Scanner scan = new Scanner(f);
            int length = 0;
            String [] file = new String [100];
            int count = 0;
            while (scan.hasNextLine()) { 
                file [length] = scan.nextLine();
                length++;
            }
            rounds = new Round [length];
            for (int i = 0; i < length; i ++) {
                Round round = new Round();
                String [] s = file[i].split(",");
                round.setPlayer(s[0]);
                round.setDate(s[3].split("\\ ")[0]);
                round.setCourseName(s[1]);
                int hole = 17;
                for (int j = s.length - 1; hole >= 0; j--) {
                    round.addScore(hole, Integer.valueOf(s[j]));
                    hole--;
                }
                rounds[i] = round;
            }
            scan.close();

            return rounds;
        } catch (FileNotFoundException e){
            System.out.println("File not found");
        } catch (InvalidDateTimeException e) {
            System.out.println(e.getMessage());
        } catch (CourseNotFoundException e) {
            System.out.println(e.getMessage());
        } return null;
    }

}
