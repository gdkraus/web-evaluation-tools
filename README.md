web-evaluation-tools
====================

Web Evaluation Tools

This is a set of tools that allows you to check for accessibility issues that other tools do not do a good job at evaluating. This is not an exhaustive accessibility checker. It has tools that are not present in other evaluators, or it presents the information in ways that other tools do not.

This tool allows you to

* see where the headings are on a page, and what the heading text is
* see where ARIA landmarks are used, and any accompanying labels they have
* where any tabindex values are set and their values
* where there are any internal links, including their source and target, and if the target has a tabindex set
* where there is cross-site content, indicating it cannot be evaluated with this tool
* the ability to force the keyboard focus to be seen
* show what languages are defined on different parts of the page
* use a high contrast CSS

The initial reason for developing this tool was to check for certain features that either required careful source code evaluation, or actually using a screen reader to test. The hope is that this tool will reduce the amount of testing that has to be done by either of those methods.

This project started as a collection of other tools that has now been combined into a single tool. Because of that, the code might seem a little convoluted, and there are definitely some efficiencies that could be built into it. I will be working on those issues over time.

