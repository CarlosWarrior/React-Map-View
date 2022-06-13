# React-Map-View

This implementation of Leaflet over React provides a simple way to filter spatial features while visualizing it.

It requires a connection to a geo-json server which parses the data from the source format (Usually ESRI or BIL).

Here is a [simple geoprocessor server](https://github.com/CarlosWarrior/python-geoprocessor-server)

This implementation is based on a context which handles the mutation of each layer independently of their features thanks to [Leaflet :smiling_face_with_three_hearts:](https://leafletjs.com/).
