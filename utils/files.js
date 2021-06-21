import Sample1 from './Registry.java';
import Sample2 from './Client.java';
import Sample3 from './Validator.java';
import playground from './playground.java';

export const files = {
  "Sample1.java": {
    name: "tomcat/java/org/apache/tomcat/util/modeler/Registry.java",
    language: "java",
    value: Sample1,
  },
  "Sample2.java": {
    name: "tomcat/webapps/examples/WEB-INF/classes/websocket/drawboard/Client.java",
    language: "java",
    value: Sample2,
  },
  "Sample3.java": {
    name: "tomcat/java/org/apache/jasper/compiler/Validator.java",
    language: "java",
    value: Sample3,
  },
  "Your own file": {
    name: "playground.java",
    language: "java",
    value: playground,
  },
}
