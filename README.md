# Clay County Maps Project

## Objective

To create a web app that allows users to access historical property ownership data for the Clay County Kansas region via search queries, filters, or an interactive map.

## Proposed Structure

This web app should have 3 different components.

1. Database
2. Back-end server (API)
3. Front-end

### Database

The database solution proposed by the courses assigning this project is MySQL. MySQL is a perfectly capable database solution and it is relatively well known to novice developers. However, I would argue that it is not the best solution for this project for the following reasons:

- Large overhead
MySQL is a relatively demanding piece of software. For this project, we will simply be accessing the data in a readonly format, and the quantity of data is relatively small. There is no need for such a heavy handed approach.
- Setup and reproducibility
In this project, we will need to have either a database served and accessible to the public, or each student working on the project will need to have an instance or an identical database setup on a local machine. We have been provided virtual machines that are accessible within the schools network, but even then, the servers running on the individual machines are not accessible outside of the virtual machine even if you are within the network. Essentially nullifying the benefit of the virtual machine. MySQL is rather difficult to install and run consistently across various platforms.
- Oracle
MySQL is owned by Oracle and, as a result, some of its functionality and community support has been restricted. Closed source software is not intrinsically evil (in my opinion), but operating under the guise of open sourced software while depreciating the user experience of free users is disingenuous at best.

The alternative I would recommend using is SQLite.

#### SQLite

SQLite is a lightweight and open source alternative to MySQL. SQLite is simple and straightforward to install on any platform, and produces a consistent environment on each platform. The quantity of data and the likely bandwidth of queries that this project will produce is well within the scope of SQLite's capabilities.

### Back-end Server (API)

The function of the back-end server is to access the data within the database and serve it in a digestible manner to the front-end code. Again, through K-State, we were provided with a virtual machine equipped with a php server that would allow us to write and run a back-end and front-end written in php that could access our database within our virtual machine. The same limitations with the virtual machines mentioned above apply here. In my experience, deploying a local php server is rather cumbersome. Quickly surveying the other members in my group, it is clear that none of my teammates have any experience using php.

For this reason I propose that we write our back-end using Node.js and the popular framework Express.js. Admittedly Express.js is probably not the best solution for this project, however, this framework is commonly used in novice level tutorials and projects, so the abundance of documentation and examples may be beneficial to us.

We would use Express.js to generate a RESTful API that would consume the parameters of the queries, generate the appropriate SQL queries, convert the response to a JSON format, and serve the data back to the front-end.

### Front-end

A front-end framework is not necessary for a project of this scope. The needs of this project can easily be met using vanilla JavaScript and potentially using an HTML canvas.

## Challenges

### Mapping regions of the rasterized map images

In order to generate an interactive map, we must map out the regions that are referenced in the data. This poses a challenge because there is no way to programmatically generate the regions due to either the imperfections of the maps themselves or geographical abnormalities within region. In other words, the regions are not perfect grid blocks that can be created with a nested for loop.

Another challenge is that the images are rasterized and may be rendered at different resolutions depending on the device the app is viewed on. So we cannot map the regions based on pixel locations, they must be mapped using some sort of relative scale such as percentage.

#### Solution

One solution I have come up with is to create a tool that allows us to interpret the data and click the outer bounds of the region within the map returning the mappings in a JSON format. These mappings could either be stored directly in the front-end code or within their own table in the database that is pulled at the time of render.

### Data handling

With the sample amount of data we were given, we could realistically put the entirety of the data in the front-end in the form of an array of objects. But this method would not scale well at all, loading times would quickly go through the roof. So we will certainly pull the data from the database per needed request. We should then cache the data in local storage.
