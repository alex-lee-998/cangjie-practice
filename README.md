# 倉頡練習 Cangjie Practice

A modern web application for learning and practicing the Cangjie (倉頡) Chinese input method. Practice typing real Chinese words and get immediate feedback on your accuracy.

## Features

- 📚 **Real Chinese Words**: Practice with over 16,000 common Chinese words
- ⌨️ **Visual Key Mapping**: Shows the keyboard layout for Cangjie codes

## How to Use

### Installation

1. Clone the repository:

```bash
git clone https://github.com/alex-lee-998/canjie.git
cd canjie
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Using the App

#### Basic Workflow

1. **View the Word**: At the top, you'll see a Chinese word with the current character highlighted in blue
2. **See the Target Character**: The large character in the center is what you're currently typing
3. **Type the Cangjie Code**: Below the character, you'll see the Cangjie code represented by keyboard keys
4. **Get Feedback**: As you type:
   - ✅ **Green** = Correct key
   - ❌ **Red** = Wrong key (triggers shake animation)
5. **Progress Through**:
   - Complete one character → automatically moves to the next character in the word
   - Complete the word → automatically gets a new random word

#### Keyboard Controls

- **Letter keys (a-z)**: Type the Cangjie code for the current character
- **Backspace**: Delete the last typed character (required to fix mistakes)
- **Enter**: Skip to a new random word

#### Important Rules

⚠️ **You cannot continue typing if you make a mistake!**

- When you type a wrong key, the code display will shake
- You must press **Backspace** to remove the wrong character
- Only then can you continue typing the correct sequence

This enforces proper learning and prevents developing bad typing habits.

### Example Practice Session

```
Word: 你好
Current Character: 你
Cangjie Code: ofd

1. Type 'o' → Shows green
2. Type 'f' → Shows green
3. Type 'd' → Shows green
4. ✓ Character complete! → Moves to 好
5. Continue with next character...
```

If you make a mistake:

```
Current Character: 你
Cangjie Code: ofd

1. Type 'o' → Shows green
2. Type 'x' → Shows red + SHAKE! ❌
3. Must press Backspace to continue
4. Type 'f' → Shows green
5. Continue...
```

## Learn More

### About Cangjie Input Method

Cangjie (倉頡) is a character input method for Chinese text that uses a set of 24 keys representing different radicals and shapes. It's widely used in Hong Kong and Taiwan.

### Resources

- [Cangjie Input Method - Wikipedia](https://en.wikipedia.org/wiki/Cangjie_input_method)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Character database sourced from common Chinese word lists
- Built with Next.js and modern web technologies
- Inspired by traditional Cangjie typing tutors

---

**Happy Typing! 加油！** 🎉
