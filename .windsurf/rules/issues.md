---
trigger: manual
---

Execute these steps in order
 - Get issue dateils. If all you have is an issue number, you may need to pull the issue details from github using the `gh` cli tool. 
 - Before doing any planning on how to resolve the issue, make sure we are on an up-to-date version of `main`. Do not ask the user to do this - you should use `git` to verify we are on main. If we are not already on main, change to main. If the workspace is not clean - ask the user how to deal with it. 
 - Make a plan.  If there are multiple reasonable paths, propose those paths along with pros and cons.
 - Get approval from user before moving forward with implementation. 
 - Once complete (and with user's approval) make a commit, push it up, and use `gh` to create a pull request for the branch. 