name := """transite-server"""
organization := "br.com.digix.transite"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.2"

PlayKeys.externalizeResources := false

libraryDependencies ++= Seq(
  guice,
  javaJpa,
  "org.hibernate" % "hibernate-entitymanager" % "5.1.0.Final",
  "org.postgresql" % "postgresql" % "42.1.4",
  "org.hibernate" % "hibernate-java8" % "5.1.0.Final"
)
