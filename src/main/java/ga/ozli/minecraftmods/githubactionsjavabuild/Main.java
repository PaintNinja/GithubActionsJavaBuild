package ga.ozli.minecraftmods.githubactionsjavabuild;

public class Main {
    public static void main(final String[] args) {
        System.out.println("Hello, world!");
        new Person("John", 20);
    }

    record Person(String name, int age) {
        public Person {
            if (age < 0) {
                throw new IllegalArgumentException("Age cannot be negative");
            }
        }
    }
}
