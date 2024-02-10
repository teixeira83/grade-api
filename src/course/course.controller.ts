import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto, addSemersterToCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('course')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto)
  }

  @Post(':id/semester')
  addSemester(@Param('id') courseId, @Body() createCourseDto: addSemersterToCourseDto) {
    return this.courseService.addSemester(courseId, createCourseDto)
  }

  @Get()
  findAll() {
    return this.courseService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id)
  }
}
