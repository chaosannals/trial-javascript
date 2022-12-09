import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorsService } from "./services/authors.service";
import { Author } from "./models/author.model";
import { PostsService } from "./services/posts.service";


@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll(id);
  }
}