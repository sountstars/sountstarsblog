# mongodb

### MongoDB 是什么

MongoDB 是一个基于`分布式文件存储`的开源 NoSQL 数据库系统，由 C++ 编写的。MongoDB 提供了`面向文档`的存储方式，操作起来比较简单和容易，支持“无模式”的数据建模，可以存储比较复杂的数据类型，是一款非常流行的 文档类型数据库 。

### MongoDB 的存储结构

- 文档（Document） ：MongoDB 中最基本的单元，由 BSON 键值对（key-value）组成，类似于关系型数据库中的行（Row）。
- 集合（Collection） ：一个集合可以包含多个文档，类似于关系型数据库中的表（Table）。
- 数据库（Database） ：一个数据库中可以包含多个集合，可以在 MongoDB 中创建多个数据库，类似于关系型数据库中的数据库（Database）。

### MongoDB 有什么特点

- 数据记录被存储为文档 ：MongoDB 中的记录就是一个 BSON 文档，它是由键值对组成的数据结构，类似于 JSON 对象，是 MongoDB 中的基本数据单元。
- 模式自由 ：集合的概念类似 MySQL 里的表，但它不需要定义任何模式，能够用更少的数据对象表现复杂的领域模型对象。
- 支持多种查询方式 ：MongoDB 查询 API 支持读写操作 (CRUD)以及数据聚合、文本搜索和地理空间查询。
- 支持 ACID 事务 ：NoSQL 数据库通常不支持事务，为了可扩展和高性能进行了权衡。不过，也有例外，MongoDB 就支持事务。与关系型数据库一样，MongoDB 事务同样具有 ACID 特性。MongoDB 单文档原生支持原子性，也具备事务的特性。
- MongoDB 4.0 加入了对多文档事务的支持，但只支持复制集部署模式下的事务，也就是说事务的作用域限制为一个副本集内。MongoDB 4.2 引入了分布式事务，增加了对分片集群上多文档事务的支持，并合并了对副本集上多文档事务的现有支持。
- 高效的二进制存储 ：存储在集合中的文档，是以键值对的形式存在的。键用于唯一标识一个文档，一般是 ObjectId 类型，值是以 BSON 形式存在的。BSON = Binary JSON， 是在 JSON 基础上加了一些类型及元数据描述的格式。
- 自带数据压缩功能 ：存储同样的数据所需的资源更少。
- 支持 mapreduce ：通过分治的方式完成复杂的聚合任务。不过，从 MongoDB 5.0 开始，map-reduce 已经不被官方推荐使用了，替代方案是 聚合管道。聚合管道提供比 map-reduce 更好的性能和可用性。
- 支持多种类型的索引 ：MongoDB 支持多种类型的索引，包括单字段索引、复合索引、多键索引、哈希索引、文本索引、 地理位置索引等，每种类型的索引有不同的使用场合。
- 支持 failover ：提供自动故障恢复的功能，主节点发生故障时，自动从从节点中选举出一个新的主节点，确保集群的正常使用，这对于客户端来说是无感知的。
- 支持分片集群 ：MongoDB 支持集群自动切分数据，让集群存储更多的数据，具备更强的性能。在数据插入和更新时，能够自动路由和存储。
- 支持存储大文件 ：MongoDB 的单文档存储空间要求不超过 16MB。对于超过 16MB 的大文件，MongoDB 提供了 GridFS 来进行存储，通过 GridFS，可以将大型数据进行分块处理，然后将这些切分后的小文档保存在数据库中。

### MongoDB 事务

- 原子性（Atomicity） ： 事务是最小的执行单位，不允许分割。事务的原子性确保动作要么全部完成，要么完全不起作用；
- 一致性（Consistency）： 执行事务前后，数据保持一致，例如转账业务中，无论事务是否成功，转账者和收款人的总额应该是不变的；
- 隔离性（Isolation）： 并发访问数据库时，一个用户的事务不被其他事务所干扰，各并发事务之间数据库是独立的。WiredTiger 存储引擎支持读未提交（ read-uncommitted ）、读已提交（ read-committed ）和快照（ snapshot ）隔离，MongoDB 启动时默认选快照隔离。在不同隔离级别下，一个事务的生命周期内，可能出现脏读、不可重复读、幻读等现象。
- 持久性（Durability）： 一个事务被提交之后。它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有任何影响。
- 参考文档
  - [技术干货| MongoDB 事务原理](https://link.juejin.cn/?target=https%3A%2F%2Fmongoing.com%2Farchives%2F82187)
  - [MongoDB 一致性模型设计与实现](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.aliyun.com%2Farticle%2F782494)
  - [MongoDB 官方文档对事务的介绍](https://link.juejin.cn/?target=https%3A%2F%2Fwww.mongodb.com%2Fdocs%2Fupcoming%2Fcore%2Ftransactions%2F)

[参考文章](https://juejin.cn/post/7193971048327577657?searchId=202408151052582B694A07F486FFE7B53F#heading-16)

### 常用命令

- 查询

  ```js
  db.userInfo.find();
  ```

- 查询某项符合条件

  ```js
  db.user.find({ age: 20 });
  ```

- 查询年龄大于 20 且小于 30 的用户

  ```js
  db.user.find({ age: { $gt: 20, $lt: 30 } });
  ```

- 询年龄在（20,22,25）范围的用户

  ```js
  db.user.find({ age: { $in: [20, 22, 25] } });
  ```

- 查询年龄为 25 或者姓名为 robin 的用户

  ```js
  db.user.find({ $or: [{ age: 25 }, { name: 'robin' }] });
  ```

- 查询 name 字段和 age 字段信息，不返回\_id 字段信息

  ```js
  db.user.find({},{'name':1,'age':1，'_id':0});
  ```

- 查询去掉后的当前聚集集合中的某列的重复数据(distict)

  ```js
  db.user.distinct('name');
  ```

- 模糊查询：查询 name 中包含 mongo 的数据

  ```js
  db.user.find({name: /mongo/}); #相当于%%
  ```

- 排序：按照年龄排序

  ```js
  db.user.find().sort({age: 1}); #升序
  db.user.find().sort({age: -1}); #降序
  ```

- limit 用法：查询前 5 条数据

  ```js
  db.user.find().limit(5);
  ```

- skip 的用法：查询 10 条以后的数据

  ```js
  db.user.find().skip(10);
  ```

- 分页：查询在 10-20 之间的数据

  ```js
  db.user.find().limit(20).skip(10); #可用于分页
  ```

- 结果集数量：查询某个结果集的记录条数
  ```js
  db.userInfo.find({ age: { $gte: 25 } }).count();
  ```
- 更新数据命令

  ```js
  db.collection.update(criteria, objNew, upsert, multi);
  //criteria：update的查询条件，类似sql update查询内where后面的；
  //objNew : update的对象和一些更新的操作符（如,,,inc...）等，类似sql update查询内set后面的；
  //upsert : 如果不存在update的记录，是否插入objNew，true为插入，默认是false，不插入；
  //multi : 是否只更新找到的第一条记录，默认false，true表示把按条件查出来多条记录全部更新；
  ```

<!-- -      ```shell
        db.user.update({age: 25}, {$set: {name: 'changeName'}}, false, true);

  # 类似 SQL：update user set name ='changeName' where age=25;

  db.user.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);
  用法：{ $inc : { field : value } } 意思对一个数字字段 field 增加 value
  类似 SQL：update user set age = age+50 where name ='lisi';

db.user.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);
类似 SQL：update users set age =age +50, name ='hoho' where name ='lisi';

db.user.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );
只更新了第一条记录

db. user.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );
全更新了

db. user.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );
只加进去了第一条

db. user.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true );
全加进去了

db. user.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
全更新了

db. user.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );
只更新了第一条

```

``` -->
