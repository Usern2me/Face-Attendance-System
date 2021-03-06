/**
 * 关于班级和课室的三个model的接口
 * class班级表
 * classtable课室表
 * classtable上课表
 */
import _class from '../models/class'
import classroom from '../models/classroom'
import classtable from '../models/classtable'
import Dao from '../middlewares/common-dao'
import Sequelize from 'sequelize'
import seqInstance from '../config/db-init'
import ApiError from '../error/ApiError'
import ApiErrorNames from '../error/ApiErrorNames'

class ClassController {
  /**
   * class用接口
   * class是关键字 这里加下划线
   */
  // get
  async getAllClass(ctx) {
    const res = await Dao.findAll(_class)
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.CLASS_NOT_EXIST)
      })
    return res
  }
  // get
  async getClassById(ctx) {
    let query_str = ctx.query
      ? {
          class_id: ctx.query.class_id
        }
      : {
          major_id: ctx.major_id
        }

    let result = []
    await Dao.findAll(_class, query_str)
      .then(res => {
        ctx.body = res
        result = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.CLASS_NOT_EXIST)
      })
    return result
  }
  // post
  async addClass(ctx) {
    let query = ctx.request.body
    await Dao.create(_class, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.ADD_CLASS_ERROR)
      })
  }
  // post
  async updateClass(ctx) {
    let query = ctx.request.body
    let { class_id } = query
    await Dao.update(_class, query, {
      class_id: class_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.UPDATE_CLASS_ERROR)
      })
  }
  // get
  async deleteClass(ctx) {
    let query = ctx.query
    await Dao.destroy(_class, query)
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CLASS_ERROR)
      })
  }
  /**
   * classroom用接口
   */

  // get
  async getAllClassroom(ctx) {
    const res = await Dao.findAll(classroom)
    ctx.body = {
      res
    }
    return res
  }
  // get
  async getClassroomById(ctx) {
    let { classroom_id } = ctx.query
    await Dao.findAll(classroom, {
      classroom_id: classroom_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.CLASS_NOT_EXIST)
      })
    return true
  }
  // post
  async addClassroom(ctx) {
    let query = ctx.request.body
    await Dao.create(classroom, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.ADD_CLASS_ERROR)
      })
  }
  // post
  async updateClassroom(ctx) {
    let query = ctx.request.body
    let { classroom_id } = query
    await Dao.update(classroom, query, {
      classroom_id: classroom_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        throw new ApiError(ApiErrorNames.UPDATE_CLASS_ERROR)
      })
  }
  // get
  async deleteClassroom(ctx) {
    let query = ctx.query
    await Dao.destroy(classroom, query)
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CLASS_ERROR)
      })
  }
  /**
   * classtable用接口
   */
  // get
  async getClasstableById(ctx) {
    let query = ''
    if (ctx.query.class_id) {
      query = `where class_id=${ctx.query.class_id}`
    }
    let sql_str = `SELECT * FROM attendance.classtable_view ${query} order by time_weekend,time_hour;`
    await seqInstance
      .query(sql_str, { raw: true, type: Sequelize.QueryTypes.SELECT })
      .then(res => {
        ctx.body = res
      })
      .catch(err => {
        console.log('err-----', err)
        throw new ApiError(ApiErrorNames.CLASS_NOT_EXIST)
      })
    return true
  }
  // post
  async addClasstable(ctx) {
    let query = ctx.request.body
    await Dao.create(classtable, {
      query
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.ADD_CLASS_ERROR)
      })
  }
  // post
  async updateClasstable(ctx) {
    let query = ctx.request.body
    let { classtable_id } = query
    await Dao.update(classtable, query, {
      classtable_id: classtable_id
    })
      .then(res => {
        ctx.body = res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.UPDATE_CLASS_ERROR)
      })
  }
  // get
  async deleteClasstable(ctx) {
    let query = ctx.query
    await Dao.destroy(classtable, query)
      .then(res => {
        ctx.body = true
        return res
      })
      .catch(() => {
        throw new ApiError(ApiErrorNames.DELETE_CLASS_ERROR)
      })
  }
}
export default new ClassController()
