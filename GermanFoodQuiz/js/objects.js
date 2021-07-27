function Question(number, img, alt, answer1, answer2, answer3, answer4, correctAns)
{
    this.number = number;
    this.img = img;
    this.alt = alt;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.correctAns = correctAns;
}

function User(name, score, time)
{
    this.name = name;
    this.score = score;
    this.time = time;
}

var q0 = new Question("0", "img00cake", "cake", "Kuchen", "Schokolade", "Wurst", "Salz", "Kuchen");
var q1 = new Question("1", "img01chocolate", "chocolate", "Pfeffer", "Schokolade", "Karotte", "Zwiebel", "Schokolade");
var q2 = new Question("2", "img02sausage", "sausage", "Knoblauch", "Salat", "Wurst", "Hähnchen", "Wurst");
var q3 = new Question("3", "img03salt", "salt", "Speck", "Kürbis", "Reis", "Salz", "Salz");
var q4 = new Question("4", "img04pepper", "pepper", "Pfeffer", "Nudeln", "Tomate", "Pilz", "Pfeffer");
var q5 = new Question("5", "img05carrot", "carrot", "Bohne", "Karotte", "Paprikaschöte", "Pommes", "Karotte");
var q6 = new Question("6", "img06onion", "onion", "Nudeln", "Eier", "Zwiebel", "Milch", "Zwiebel");
var q7 = new Question("7", "img07garlic", "garlic", "Apfel", "Banane", "Eis", "Knoblauch", "Knoblauch");
var q8 = new Question("8", "img08lettuce", "lettuce", "Salat", "Bier", "Wein", "Wasser", "Salat");
var q9 = new Question("9", "img09chicken", "chicken", "Saft", "Hähnchen", "Schinken", "Kuchen", "Hähnchen");
var q10 = new Question("10", "img10bacon", "bacon", "Schokolade", "Wurst", "Speck", "Salz", "Speck");
var q11 = new Question("11", "img11pumpkin", "pumpkin", "Pfeffer", "Karotte", "Zwiebel", "Kürbis", "Kürbis");
var q12 = new Question("12", "img12rice", "rice", "Reis", "Knoblauch", "Salat", "Hähnchen", "Reis");
var q13 = new Question("13", "img13pasta", "pasta", "Speck", "Nudeln", "Kürbis", "Reis", "Nudeln");
var q14 = new Question("14", "img14tomato", "tomato", "Nudeln", "Pilz", "Tomate", "Bohne", "Tomate");
var q15 = new Question("15", "img15mushroom", "mushroom", "Paprikaschöte", "Pommes", "Nudeln", "Pilz", "Pilz");
var q16 = new Question("16", "img16beans", "beans", "Bohne", "Eier", "Milch", "Apfel", "Bohne");
var q17 = new Question("17", "img17capsicum", "capsium", "Banane", "Paprikaschöte", "Eis", "Bier", "Paprikaschöte");
var q18 = new Question("18", "img18chips", "chips", "Wein", "Wasser", "Saft", "Pommes", "Pommes");
var q19 = new Question("19", "img19noodles", "noodles", "Nudeln", "Schinken", "Kuchen", "Schokolade", "Nudeln");
var q20 = new Question("20", "img20eggs", "eggs", "Wurst", "Eier", "Salz", "Pfeffer", "Eier");
var q21 = new Question("21", "img21milk", "milk", "Karotte", "Zwiebel", "Milch", "Knoblauch", "Milch");
var q22 = new Question("22", "img22apple", "apple", "Salat", "Hähnchen", "Speck", "Apfel", "Apfel");
var q23 = new Question("23", "img23banana", "banana", "Banane", "Kürbis", "Reis", "Nudeln", "Banane");
var q24 = new Question("24", "img24icecream", "icecream", "Tomate", "Eis", "Pilz", "Bohne", "Eis");
var q25 = new Question("25", "img25beer", "beer", "Paprikaschöte", "Pommes", "Bier", "Nudeln", "Bier");
var q26 = new Question("26", "img26wine", "wine", "Eier", "Milch", "Apfel", "Wein", "Wein");
var q27 = new Question("27", "img27water", "water", "Banane", "Wasser", "Eis", "Bier", "Wasser");
var q28 = new Question("28", "img28juice", "juice", "Wasser", "Schinken", "Saft", "Kuchen", "Saft");
var q29 = new Question("29", "img29ham", "ham", "Schokolade", "Wurst", "Salz", "Schinken", "Schinken");