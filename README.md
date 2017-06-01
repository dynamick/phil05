## Phil05

This is a demo project aimed to give life to an old toy, implanting a raspberrypi inside.

<img src="docs/front.jpg" alt="front" class="inline"/>

## Hardware

The hardware I used for this project is:
- [Old motorized toy](http://amzn.to/2redi0O)
- [RaspberryPi 3 model b](http://amzn.to/2sqIQ19)
- [Lithium Battery Pack Expansion Board](http://amzn.to/2qJ58dh)
- [UltraSonic module hc-sr04](http://amzn.to/2qJ7poG)
- [L298 Dual H-Bridge Motor Driver (DC and Stepper Motors)](http://amzn.to/2regAB3)
- [Raspicam](http://amzn.to/2sqLEvf)
- breadboard
- a bunch of wires

## Software

The software runs on a Raspbian 8 (jessie). The code is developed in nodejs, a promising, popular and fast serverside version of javascript. It just contains two sub-project: 
- a manual driving via keyboard
- an autopilot test code using the sonar

## Installation

```bash
git clone https://github.com/dynamick/phil05
cd phil05
sudo npm install
```

## Running

You could choose the manual driving mode launching:
```bash
sudo npm run manual
```

... or you could try the autopilot using:
```bash
sudo npm run autopilot
```

... or you could lauch both on two console to ibrid command your robot.





### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/dynamick/phil05/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://help.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
